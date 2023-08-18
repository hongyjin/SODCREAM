document.addEventListener("DOMContentLoaded", function() {
    const addTodoButton = document.getElementById("addTodoButton");
    const modal = document.getElementById("todoModal");
    const closeButton = document.querySelector(".close");
    const saveTodoButton = document.getElementById("saveTodoButton");
    const todoContentInput = document.getElementById("todoContent");
    const categoryNameInput = document.getElementById("categoryName");
  
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
      } catch (error) {
        console.error("에러 발생:", error);
      }
    });
  });
  