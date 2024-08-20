# [Devcourse]SimpleTodo

<h3>데브코스 1차 과제</h3>

## 개요📚

이 Todo List 애플리케이션은 사용자가 할 일을 추가하고, 읽고, 업데이트하며, 삭제할 수 있는 간단한 웹 애플리케이션입니다. <br>
MongoDB를 데이터베이스로 사용하며, Express.js와 Node.js를 백엔드 서버로 사용합니다. <br>
또한 프론트엔드는 라이브러리나 프레임워크 없이 
Vanilla js를 사용합니다.
<br><br>

## 개발기간
8월 19일 ~ 8월 20일 (16시간)

<br>

## 최소기능⚙️

- 할 일 추가
- 할 일 읽기 (모든 할 일 및 특정 할 일)
- 할 일 업데이트
- 할 일 삭제

  
  
### 추가기능 
날짜별로 투두리스트 관리

<br>

## 기술 스택

- <span style="color: purple;">**Backend:** Node.js, Express.js</span>
- <span style="color: teal;">**Database:** MongoDB</span>
- <span style="color: brown;">**Frontend:** HTML, CSS (및 기타 프론트엔드 기술)</span>

<br>

## 시연영상🎬


https://github.com/user-attachments/assets/11165949-3ab0-489d-ab3c-528785aff50f



<br>

## 사용법

- **할 일 추가:**  
  `POST /todos`  
  요청 본문에 JSON 형식으로 할 일 데이터를 포함합니다.

- **모든 할 일 읽기:**  
  `GET /todos`  
  선택적으로 `date` 쿼리 파라미터를 사용하여 특정 날짜의 할 일을 필터링할 수 있습니다.

- **특정 할 일 읽기:**  
  `GET /todos/:id`  
  `:id`는 읽고자 하는 할 일의 ID입니다.

- **할 일 업데이트:**  
  `PUT /todos/:id`  
  요청 본문에 업데이트할 데이터를 포함합니다. `_id` 필드는 포함하지 않습니다.

- **할 일 삭제:**  
  `DELETE /todos/:id`  
  `:id`는 삭제할 할 일의 ID입니다.

<br>

## API 엔드포인트

- `GET /todos` - 모든 할 일 목록을 조회합니다.
- `GET /todos/:id` - 특정 ID를 가진 할 일을 조회합니다.
- `POST /todos` - 새로운 할 일을 추가합니다.
- `PUT /todos/:id` - 특정 ID를 가진 할 일을 업데이트합니다.
- `DELETE /todos/:id` - 특정 ID를 가진 할 일을 삭제합니다.

<br>



