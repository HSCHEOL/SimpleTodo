const button = document.querySelector("button");
const input = document.querySelector("input");

async function Todo_reg() {
  const todoValue = input.value;

  if (!todoValue.length) {
    alert("Todolist를 입력하세요!");
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
        completed: false, // 기본값
      }),
    });
  } catch (error) {
    console.log("error 입니다.");
  }
}
