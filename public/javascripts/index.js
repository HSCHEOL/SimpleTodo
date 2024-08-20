const button = document.querySelector("#Reg_btn");
const input = document.querySelector("#Todoinput");
const Todofield = document.querySelector("#text_field");
const dateInput = document.querySelector("#dateInput");

async function Todo_reg() {
  const todoValue = input.value;
  const selectedDate = dateInput.value;

  if (!todoValue.length) {
    alert("Todolist를 입력하세요!");
    return; // 입력값이 없을 때 함수 종료
  }

  if (!selectedDate) {
    alert("날짜를 선택하세요!");
    return; // 날짜가 선택되지 않았을 때 함수 종료
  }

  try {
    // POST 요청 보내기
    const response = await fetch("http://localhost:3000/todolist", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userName: "한승철",
        content: todoValue,
        date: selectedDate, // 날짜 추가
      }),
    });

    if (response.ok) {
      input.value = ""; // 입력 필드 초기화

      // 새로 추가된 항목을 직접 Todofield에 추가
      const todo = await response.json(); // 서버에서 새로 추가된 todo 항목 받기
      console.log(todo);

      // 체크박스와 함께 div 생성
      const div = document.createElement("div");
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.id = todo._id; // 항목의 _id를 체크박스의 id로 사용
      checkbox.checked = todo.completed || false; // 서버에서 받은 completed 상태 설정

      const label = document.createElement("label");
      label.htmlFor = todo._id;
      label.textContent = todo.content;

      const btn = document.createElement("button");
      btn.className = "delete-btn"; // 버튼 클래스 추가
      const img = document.createElement("img");
      img.src = "./images/Trash.svg";
      img.alt = "Trash";
      img.className = "Trash-img";

      btn.appendChild(img);
      div.className = "content";
      div.appendChild(checkbox);
      div.appendChild(label);
      div.appendChild(btn); // 버튼 추가

      // 버튼 클릭 시 처리
      btn.addEventListener("click", async () => {
        try {
          const deleteResponse = await fetch(
            `http://localhost:3000/todolist/${todo._id}`,
            {
              method: "DELETE",
            }
          );

          if (deleteResponse.ok) {
            div.remove(); // 삭제 성공 시 div 제거
            saveCheckboxState(); // 체크 상태 저장
          } else {
            console.error("Failed to delete todo.");
          }
        } catch (error) {
          console.log("error 입니다.", error);
        }
      });

      Todofield.appendChild(div);
    } else {
      console.error("Failed to add todo.");
    }
  } catch (error) {
    console.log("error 입니다.", error);
  }
}

async function loadTodosForDate() {
  const selectedDate = dateInput.value;

  if (!selectedDate) {
    return; // 날짜가 선택되지 않았을 때 함수 종료
  }

  try {
    const response = await fetch(
      `http://localhost:3000/todolist?date=${selectedDate}`,
      {
        method: "GET",
      }
    );
    const data = await response.json();

    // Todofield 초기화
    Todofield.innerHTML = "";

    // 데이터로 체크박스와 레이블 생성
    data.forEach((todo) => {
      const div = document.createElement("div");
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.id = todo._id; // 항목의 _id를 체크박스의 id로 사용
      checkbox.checked = todo.completed || false; // 체크 상태 설정 (optional)

      const label = document.createElement("label");
      label.htmlFor = todo._id;
      label.textContent = todo.content;
      div.className = "content"; // content 클래스 추가

      const btn = document.createElement("button");
      btn.className = "delete-btn"; // 버튼 클래스 추가
      const img = document.createElement("img");
      img.src = "./images/Trash.svg";
      img.alt = "Trash";
      img.className = "Trash-img";

      btn.appendChild(img);
      div.appendChild(checkbox);
      div.appendChild(label);
      div.appendChild(btn); // 버튼 추가

      // 버튼 클릭 시 처리
      btn.addEventListener("click", async () => {
        try {
          const deleteResponse = await fetch(
            `http://localhost:3000/todolist/${todo._id}`,
            {
              method: "DELETE",
            }
          );

          if (deleteResponse.ok) {
            div.remove(); // 삭제 성공 시 div 제거
          } else {
            console.error("Failed to delete todo.");
          }
        } catch (error) {
          console.log("error 입니다.", error);
        }
      });

      Todofield.appendChild(div);
    });

    // 페이지 로드 시 체크 상태를 로컬 스토리지에서 로드
  } catch (error) {
    console.log(error);
  }
}

// 페이지 로드 시 초기 목록 가져오기
document.addEventListener("DOMContentLoaded", () => {
  loadTodosForDate(); // 초기 로딩 시 날짜별 투두리스트 로드
});

dateInput.addEventListener("change", loadTodosForDate);
