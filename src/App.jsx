import { useEffect, useState } from "react";

function App() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("studentTasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  const [task, setTask] = useState("");
  const [subject, setSubject] = useState("");
  const [priority, setPriority] = useState("Medium");

  useEffect(() => {
    localStorage.setItem("studentTasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (e) => {
    e.preventDefault();

    if (!task.trim() || !subject.trim()) {
      alert("Please enter task and subject.");
      return;
    }

    const newTask = {
      id: Date.now(),
      task: task.trim(),
      subject: subject.trim(),
      priority,
      completed: false,
    };

    setTasks([...tasks, newTask]);

    setTask("");
    setSubject("");
    setPriority("Medium");
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((item) =>
        item.id === id
          ? { ...item, completed: !item.completed }
          : item
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((item) => item.id !== id));
  };

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((item) => item.completed).length;
  const pendingTasks = totalTasks - completedTasks;

  return (
    <div className="app">
      <header>
        <h1>Student Task Manager</h1>
        <p>Manage your academic tasks easily</p>
      </header>

      <section className="stats">
        <div className="stat-card">
          <h3>Total Tasks</h3>
          <p>{totalTasks}</p>
        </div>

        <div className="stat-card">
          <h3>Completed</h3>
          <p>{completedTasks}</p>
        </div>

        <div className="stat-card">
          <h3>Pending</h3>
          <p>{pendingTasks}</p>
        </div>
      </section>

      <section className="form-card">
        <h2>Add New Task</h2>

        <form onSubmit={addTask}>
          <input
            type="text"
            placeholder="Enter task"
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />

          <input
            type="text"
            placeholder="Enter subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />

          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="Low">Low Priority</option>
            <option value="Medium">Medium Priority</option>
            <option value="High">High Priority</option>
          </select>

          <button type="submit">Add Task</button>
        </form>
      </section>

      <section className="task-section">
        <h2>My Tasks</h2>

        {tasks.length === 0 ? (
          <div className="empty">
            <p>No tasks available.</p>
            <p>Add your first academic task above.</p>
          </div>
        ) : (
          <div className="task-list">
            {tasks.map((item) => (
              <div
                className={`task-card ${
                  item.completed ? "completed" : ""
                }`}
                key={item.id}
              >
                <div className="task-info">
                  <h3>{item.task}</h3>
                  <p>Subject: {item.subject}</p>
                  <span className={`priority ${item.priority.toLowerCase()}`}>
                    {item.priority}
                  </span>
                </div>

                <div className="actions">
                  <button
                    className="complete-btn"
                    onClick={() => toggleTask(item.id)}
                  >
                    {item.completed ? "Undo" : "Complete"}
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() => deleteTask(item.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <footer>
        <p>Student Task Manager | React Application</p>
      </footer>
    </div>
  );
}

export default App;