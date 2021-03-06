import Head from 'next/head'
import {useState} from 'react'
import dayjs from 'dayjs'
import Modal from '../components/modal'
import getData from '../components/firebase'

/*export async function getStaticProps() {
  // Call an external API endpoint to get posts.
  // You can use any data fetching library
  const fs = require('fs');
  let data = await fs.readFileSync('./data/data.json', 'utf8');
  return {
    props: {
      data: JSON.parse(data),
    },
  }
}*/

export async function getServerSideProps(context) {
  let data = await getData()
  return {
    props: {data}, // will be passed to the page component as props
  }
}

function getMonday () {
  let now = dayjs()
  if (now.day() === 0) {
    return now.subtract(6, 'day')
  } else {
    return now.startOf('week').add(1, 'day')
  }
}



export default function Home({data}) {
  const days = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su']
  let monday = getMonday()
  let oneWeek = new Array(7).fill(0).map((k,i)=>{
    return monday.add(i, 'day').format('MMM DD') + ' ' + days[i]
  })
  let [week] = useState(oneWeek)
  let [edit, setEdit] = useState(null)
  let onClickTableCell = (key, day)=>{
    setEdit({
      key, day,
      data: data[key],
      week: week[day]
    })
  }
  return (
    <div className="container">
      <Head>
        <title>Let's Go Exercising</title>
      </Head>
      <main>
        <table>
          <thead>
            <tr>
              <th>
                Name
              </th>
              {week.map(day=>{
                return <th key={day.replace(' ', '')}>{day}</th>
              })}
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
          {Object.keys(data).map(k=>{
            return <tr key={k}>
              <td style={{textTransform: 'capitalized'}}>{k}</td>
              {
                (()=>{
                  let user = data[k]
                  if (user.performance) {
                    return [0,1,2,3,4,5,6].map(( i)=>{
                      const date = user.performance[i]
                      if (date) {
                        return <td key={i} onClick={()=>{
                          onClickTableCell(k, i)
                        }}>{
                          `${date.type} ${date.calories}`
                        }</td>
                      } else {
                        return <td key={i} onClick={()=>{
                          onClickTableCell(k, i)
                        }}>X</td>
                      }
                    })
                  } else {
                    return [0,1,2,3,4,5,6].map(i=>{
                      return <td key={i} onClick={()=>{
                        onClickTableCell(k, i)
                      }}>X</td>
                    })
                  }
                })()
              }
              <td>
                {
                  (()=>{
                    let performance = data[k]?.performance
                    let count = 0
                    if (performance) {
                      Object.keys(performance).forEach((k)=>{
                        if (performance[k]) {
                          count++
                        }
                      })
                    }
                    return count
                  })()
                }
              </td>
            </tr>
          })}
          </tbody>
        </table>
        <p style={{'text-align': 'left', 'width': '100%'}}>Click each cell to add or edit</p>
        {edit?<Modal edit={edit} onClose={()=>{setEdit(null)}} fullData={data}>
        </Modal>:null}
      </main>

      <style jsx>{`

        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;
        }
        table { 
          width: 100%; 
          border-collapse: collapse; 
        }
        /* Zebra striping */
        tr:nth-of-type(odd) { 
          background: #eee; 
        }
        th { 
          background: #333; 
          color: white; 
          font-weight: bold; 
        }
        td, th { 
          padding: 6px; 
          border: 1px solid #ccc; 
          text-align: left; 
        }
        td {
          cursor: pointer;
        }
      `}</style>
    </div>
  )
}
