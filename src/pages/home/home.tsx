const Home = () => {
    return (
        <div>
            <h1>Home</h1>
            <p>Welcome to our app! This is a React frontend for a Windows system. Here are some of the pages and their functionality:</p>
            <ul>
                <li><strong>Libraries</strong>: Displays a list of libraries. You can click on a library to view its details.</li>
                <li><strong>Library</strong>: Displays the details of a library. You can also edit the library here.</li>
                <li><strong>Media</strong>: Displays the details of a media item. You can also edit the media item here.</li>
                <li><strong>Library Form</strong>: Allows you to create a new library or edit an existing one.</li>
                <li><strong>Update Library</strong>: Allows you to update the details of a library.</li>
                <li><strong>Search</strong>: Allows you to search for media in our database.</li>
            </ul>
        </div>
    );
}

export default Home;