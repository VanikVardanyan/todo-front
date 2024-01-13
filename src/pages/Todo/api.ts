import axios from "@/app/axios";

export const addTodo = async (description: string) => {
  try {
    const response = await axios.post("/api/tasks", { description });
    return response.data;
  } catch (error) {
    console.error("Error adding todo:", error);
    throw error;
  }
};

export const getTodos = async () => {
  try {
    const response = await axios.get("/api/tasks");
    return response.data;
  } catch (error) {
    console.error("Error adding todo:", error);
    throw error;
  }
};

export const completeTodo = async (id: string) => {
  try {
    const response = await axios.post(`/api/tasks/${id}/complete`, {});
    return response.data;
  } catch (error) {
    console.error("Error adding todo:", error);
    throw error;
  }
};
