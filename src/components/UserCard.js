const UserCard = ({ name, surname, id }) => {
    return (
        <div className="item">
            <h1>{id} &nbsp; </h1>
            <span className='text'>
                {name} {surname}
            </span>
        </div>
    );
};

export default UserCard;