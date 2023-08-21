document.addEventListener("DOMContentLoaded", function() {
    const addTodoButton = document.getElementById("addTodoButton");
    const modal = document.getElementById("todoModal");
    const closeButton = document.querySelector(".close");
    const saveTodoButton = document.getElementById("saveTodoButton");
    const todoContentInput = document.getElementById("todoContent");
    const categoryNameInput = document.getElementById("categoryName");

  const renderTodos = (todos) => {
      const todoList = document.querySelector('.todolist ul');
      todoList.innerHTML = '';

      todos.forEach((todo) => {
          const li = document.createElement('li');
          li.textContent = todo.todoContent;
          todoList.appendChild(li);
      });
  };
  
    addTodoButton.addEventListener("click", () => {
      modal.style.display = "block";
    });
  
    closeButton.addEventListener("click", () => {
      modal.style.display = "none";
    });
  
    window.addEventListener("click", (event) => {
      if (event.target === modal) {
        modal.style.display = "none";
      }
    });
  
    saveTodoButton.addEventListener("click", async () => {
      const todoContent = todoContentInput.value;
      const categoryName = categoryNameInput.value;
      const userId = '<%= userId %>'; // 세션에 저장된 userId를 가져옴

  
      try {
        const response = await fetch("/addTodo", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            todoContent: todoContent,
            categoryName: categoryName,
            userId: userId
          })
        });
  
        modal.style.display = "none";
        loadAndRenderTodos(); //투두 저장 후 리스트 불러오기
        
      } catch (error) {
        console.error("에러 발생:", error);
      }
    });
    
    loadAndRenderTodos();
  });
  
