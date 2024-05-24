import React,{useRef,useState,useEffect} from "react";
import './body.css';


function Body(){

    const task_name = useRef(null);
    const task_description = useRef(null);
    // const [tasks,set_task] = useState([]);

    const [tasks, set_task] = useState(() => {
        
        const savedTasks = localStorage.getItem('tasks');
        return savedTasks ? JSON.parse(savedTasks) : [];
    });

    useEffect(() => {
        
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    function generate_task(){

        const new_task_name=task_name.current.value;
        const new_task_description=task_description.current.value;

        if(new_task_name && task_description){
            const new_task={
                name:new_task_name,
                description:new_task_description
            };

            set_task([...tasks,new_task]);

            console.log(tasks);

            task_name.current.value="";
            task_description.current.value="";
        }

    }
    
 
    
    let taskElements;


    if(tasks.length>0){

        taskElements = tasks.map(function(task, index) {

            function delete_that_task(task){
                set_task(tasks.filter((t) => {
                    return t !== task;
                }))
            }
            
            return (
                <div key={index} id="task">
                    <h3 id='task_name'>{task.name}</h3>
                    <p id='task_description'>{task.description}</p>
                    <button id='delete_btn' onClick={ function() { return delete_that_task(task) }}>-</button>
                </div>
            );
        });
    } else {
            taskElements = (<div id="no_task_left">
                            <h3 id='no_task_left_h'>No Task Left</h3>
                            </div>)
    }
            
    return(
        
        <div id='body'>

            <div id='task_generator'>                

                <input
                    type="text"
                    placeholder="Task Name "
                    ref={task_name}
                    id='task_name_input'
                />

                <textarea 
                        placeholder="Task Description"
                        ref={task_description}
                        id="task_description_input" 
                ></textarea>

                <button onClick={generate_task} id='task_generator_button'>+</button>

            </div>


            <div className='task_list'>
                {taskElements}
            </div>

        </div>
    )

}

export {Body};