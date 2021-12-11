import {useState} from 'react'

function saveData(key, day, type, calories, fullData) {
  return new Promise((resolve, reject)=>{
    let copy = JSON.parse(JSON.stringify(fullData))
    if (!copy[key].performance) {
      copy[key].performance = {}
    }
    copy[key].performance[day] = {
      type,
      calories
    }
    fetch("/api/update",
      {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify({
          key,
          index: day,
          performance: copy[key].performance
        })
      }).then(resolve).catch(reject)
  })

}

export default function Modal ({edit, onClose, fullData}) {
  let {key, week, data, day} = edit
  let performance = data.performance || {}
  let intialData = performance[day] || {}
  let [model, setModel] = useState(intialData.type)
  let [calories, setCalories] = useState(intialData.calories || 200)
  return <>
    <div className="modal-backdrop">
    </div>
    <div className="modal-container">
      <header>
        Change {key} for {week}
      </header>
      <section>
        <select value={model} onChange={(event)=>{
          setModel(event.target.value)
        }}>
          <option value="running">Running</option>
          <option value="walking">Walking</option>
          <option value="rowing">Rowing</option>
          <option value="basketball">Basketball</option>
          <option value="badminton">Badminton</option>
          <option value="ropejumping">Rope Jumping</option>
          <option value="hiking">Hiking</option>
          <option value="bicycle">Bicycle</option>
          <option value="others">Others</option>
        </select>
        <input value={calories} onChange={(event)=>{
          setCalories(event.target.value)
        }} />
      </section>
      <footer>
        <button onClick={onClose}>Cancel</button>
        <button onClick={()=>{
          saveData(key, day, model || 'running', calories || 200, fullData).then(()=>{
            location.reload()
          })
        }}>Save</button>
      </footer>
    </div>
    <style jsx>{
      `
      .modal-backdrop {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        background: #191919;
        height: 100vh;
        opacity: .2;
      }
      .modal-container {
        position: fixed;
        background: white;
        border-radius: 6px;
        padding: 20px;
      }
      section {
        margin: 16px 0
      }
      button {
        margin-right: 16px;
        display: inline-block;
        cursor: pointer;
      }
      input {
        margin-left: 8px;
      }
      `
    }

    </style>
  </>
}