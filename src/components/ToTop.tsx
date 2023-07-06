import { HiArrowNarrowUp } from 'react-icons/hi';


export default function ToTop() {

    function takeToTop() {
        window.scroll({
            top: 0,
            left: 0,
            behavior:'smooth'
        })    
    }
    return (
        <div className='to-top' onClick={takeToTop}>
            <HiArrowNarrowUp />
        </div>
    )
}

