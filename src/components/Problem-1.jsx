import React, {useState} from 'react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

const Problem1 = () => {
    const [alldata, setAlldata] = useState([]);
    const [show, setShow] = useState('all');

    console.log(alldata);

    const handleClick = (val) => {
        setShow(val);
        
            fetch("http://localhost:5000/all-tasks")
                .then((res) => res.json())
                .then((result) => {
                    
                    setAlldata(result);
                    // if (show == "active") {
            
                    //     const taskall = alldata.filter(task=>task.status=="Active")
                    //     setAlldata(taskall);
                    // }
                    // if (show == "completed") {
                
                    //     const taskall = alldata.filter(task=>task.status=="Completed")
                    //     setAlldata(taskall);
                    // }
                 
                });
       
        
    }
    const handleClick2 = (val) => {
        setShow(val);
        
            fetch("http://localhost:5000/all-tasks")
                .then((res) => res.json())
                .then((result) => {
                    
                    
                   
            
                        const taskall = result.filter(task=>task.status=="Active")
                        setAlldata(taskall);
                    
                    
                 
                });
       
        
    }
    const handleClick3 = (val) => {
        setShow(val);
        
            fetch("http://localhost:5000/all-tasks")
                .then((res) => res.json())
                .then((result) => {
                    
        
                        const taskall = result.filter(task=>task.status=="Completed")
                        setAlldata(taskall);
                    
                 
                });
       
        
    }
    
    console.log(show);
    
    const {
        register,
        handleSubmit
        
    } = useForm();

    const handelAddTask = (data) => {
        console.log(data.name);
        const task = {name:data.name, status:data.status}
        fetch("http://localhost:5000/add-task", {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(task),
          })
            .then((res) => res.json())
            .then((result) => {
              console.log(result);
             
            });
    }
    useEffect(() => {
        
    },[])
    return (

        <div className="container">
            <div className="row justify-content-center mt-5">
                <h4 className='text-center text-uppercase mb-5'>Problem-1</h4>
                <div className="col-6 ">
                    <form onSubmit={handleSubmit(handelAddTask)} className="row gy-2 gx-3 align-items-center mb-4">
                        <div className="col-auto">
                            <input type="text"  {...register("name", { required: "name needed" })} className="form-control" placeholder="Name" />
                            
                        </div>
                        <div className="col-auto">
                            <input type="text" {...register("status", { required: "status needed" })} className="form-control" placeholder="Status"/>
                        </div>
                        <div className="col-auto">
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </div>
                    </form>
                </div>
                <div className="col-8">
                    <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                        <li className="nav-item">
                            <button  className={`nav-link ${show==='all' && 'active'}`} type="button" onClick={()=>handleClick('all')}>All</button>
                        </li>
                        <li className="nav-item">
                            <button className={`nav-link ${show==='active' && 'active'}`} type="button" onClick={()=>handleClick2('active')}>Active</button>
                        </li>
                        <li className="nav-item">
                            <button  className={`nav-link ${show==='completed' && 'active'}`} type="button" onClick={()=>handleClick3('completed')}>Completed</button>
                        </li>
                    </ul>
                    <div className="tab-content"></div>
                    <table className="table table-striped ">
                        <thead>
                        <tr>
                            <th scope="col">SL</th>
                            <th scope="col">Name</th>
                            <th scope="col">Status</th>
                        </tr>
                        </thead>
                        <tbody>
                        {alldata.map((data,i)=><tr key={i}>
          <td>{i+1}</td>
          <td>{data.name}</td>
          <td>{data.status}</td>
          
        </tr>)}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Problem1;