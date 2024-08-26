import './calendar.css'

interface ContainerProps {
    monthMatrix: number[][]
}

const MonthCalendar : React.FC<ContainerProps> = ({monthMatrix}) => {
    

    
    return (
        <>
        <div className='days-label'>
            <p>
                lunes
            </p>
            <p>
                martes
            </p>
        </div>
        <div className="calendar-month">
             <div className="grid-item">1</div>
  <div className="grid-item">2</div>
  <div className="grid-item">3</div>
  <div className="grid-item">4</div>
  <div className="grid-item">5</div>
  <div className="grid-item">6</div>
  <div className="grid-item">7</div>
  <div className="grid-item">8</div>
  <div className="grid-item">9</div>
  <div className="grid-item">10</div>
  <div className="grid-item">11</div>
  <div className="grid-item">12</div>
  <div className="grid-item">13</div>
  <div className="grid-item">14</div>
  <div className="grid-item">15</div>
  <div className="grid-item">16</div>
  <div className="grid-item">17</div>
  <div className="grid-item">18</div>
  <div className="grid-item">19</div>
  <div className="grid-item">20</div>
  <div className="grid-item">21</div>
  <div className="grid-item">22</div>
  <div className="grid-item">23</div>
  <div className="grid-item">24</div>
  <div className="grid-item">25</div>
  <div className="grid-item">26</div>
  <div className="grid-item">27</div>
  <div className="grid-item">28</div>
  <div className="grid-item">29</div>
  <div className="grid-item">30</div>
  <div className="grid-item">31</div>
  <div className="grid-item">32</div>
  <div className="grid-item">33</div>
  <div className="grid-item">34</div>
  <div className="grid-item">35</div>
  <div className="grid-item">36</div>
  <div className="grid-item">37</div>
  <div className="grid-item">38</div>
  <div className="grid-item">39</div>
  <div className="grid-item">40</div>
  <div className="grid-item">41</div>
  <div className="grid-item">42</div>
        </div>
        </>
    )
}

export default MonthCalendar