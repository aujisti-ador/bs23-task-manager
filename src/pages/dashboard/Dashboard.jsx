import React from 'react'
import "./Dashboard.css"
import TileButtons from '../../components/widgets/cards/TileButtons'
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const navigate = useNavigate();

  const handleTitleClick = (e) => {
    if (e.target.innerText === "Tasks") {
      navigate("/dashboard/tasks", { replace: true })
    }
    else if (e.target.innerText === "Members") {
      navigate("/dashboard/members", { replace: true })
    }
  }

  return (
    <div className='container-dashboard'>
      <h1>Dashboard</h1>
      <div className='body'>
        <TileButtons title={"Tasks"} onTitleClick={handleTitleClick} />
        <TileButtons title={"Members"} onTitleClick={handleTitleClick} />
      </div>
    </div>
  )
}

export default Dashboard