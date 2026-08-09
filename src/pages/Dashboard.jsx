const Dashboard = function (props) {
    return (
        <section>
            <header>
                <h1>Welcome {props.user.username}! This is the test</h1>
            </header>
        </section>
    )
}

export default Dashboard