import './App.css';
import {useEffect, useState} from "react";
import {data} from "./dummyData";
import UserCard from "./components/UserCard";

function App() {
    const usersPerPage = 20
    const [currentPage, setCurrentPage] = useState(0)
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)

    let options = {
        threshold: [0.5]
    }

    const onEntry = function (entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active')
                observer.unobserve(entry.target)
            } else {
                //entry.target.classList.remove('active')
            }
        })
    }
    const observer = new IntersectionObserver(onEntry, options)


    useEffect(() => {
        const targets = document.querySelectorAll('.item')
        targets.forEach(target => observer.observe(target))
        if (loading) {
            const res = data.slice(usersPerPage * currentPage, usersPerPage * currentPage + usersPerPage)
            setUsers([...users, ...res])
            setCurrentPage((prevPage) => prevPage + 1)
            setLoading(false)
        }
    }, [loading])

    useEffect(() => {
        document.addEventListener("scroll", scrollHandler)
        return function () {
            document.removeEventListener("scroll", scrollHandler)
        }
    }, [])

    const scrollHandler = (e) => {
        const {scrollHeight, scrollTop} = e.target.documentElement
        if (scrollHeight - (scrollTop + window.innerHeight) === 0
            && users.length < 100) {
            setLoading(true)
        }
    }
    return (
        <div className="App">
            {users.map((user, id) => {
                return (
                    <UserCard
                        key={user.name + user.surname}
                        name={user.name}
                        surname={user.surname}
                        id={id + 1}
                    />
                )
            })}
        </div>
    );
}

export default App;
