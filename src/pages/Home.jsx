import { useSelector } from 'react-redux';
import { useCollection } from "../hooks/useCollection";
import { useState } from 'react';
import './home.css';
import { collection, addDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase/fireBaseConfig';


export default function Home() {
    const [title, setTitle] = useState('');
    const [inputVal, setInputVal] = useState('');

    const { user } = useSelector(state => state.currentUser);
    const { data } = useCollection("tasks", ["uid", "==", user.uid]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const obj = {
            title,
            body: inputVal,
            uid: user.uid
        };
        
        try {
            await addDoc(collection(db, "tasks"), obj);
            alert("Task added successfully");
            setInputVal('');
            setTitle('');
            const music = new Audio("/public/add.mp3");
            music.play();
        } catch (error) {
            console.error("Error adding document: ", error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await deleteDoc(doc(db, "tasks", String(id))); // Ensure id is a string
            alert("Task deleted successfully");
            const music = new Audio("/public/delete.mp3");
            music.play();
        } catch (error) {
            console.error("Error deleting document: ", error);
        }
    };

    return (
        <div className="container">
            <div className='user-info'>
            <img className='image' src={user.photoURL} alt="" />
            <h3>Logout</h3>
            </div>
            <div className="wrapper">
                <svg>
                    <text x="50%" y="50%" dy=".35em" text-anchor="middle">
                        TO DO LIST
                    </text>
                </svg>
            </div>
            <div className="panel">
                <div className="glitch-wrapper">
                    <div className="glitch" data-text="Add new task">Add new task</div>
                </div>
                <form onSubmit={handleSubmit}>
                    <input type="text" value={inputVal} placeholder="Enter title" onChange={(e) => setInputVal(e.target.value)} />
                    <input type="text" value={title} placeholder="Enter theme" onChange={(e) => setTitle(e.target.value)} />
                    <button className="submit">Add Task</button>
                </form>
            </div>
            <ol className="todo-list">
                {data && data.map((todo) => (
                    <li key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
                        <div className='action'>
                            <button className='delete' onClick={() => handleDelete(todo.id)}>Delete</button>
                        </div>
                        <div className='title'>
                            <h3>{todo.title}</h3>
                            <p>{todo.body}</p>
                        </div>
                        <div className='line'></div>
                    </li>
                ))}
            </ol>
        </div>
    );
}
