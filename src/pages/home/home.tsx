import "./home.css";

const Home = () => {
  return (
    <div id="home">
      <h1 className="page-header">Home</h1>
      <div className="page-main">
        <h2 className="page-subheader">React Media Libraries</h2>
        <p className="page-intro">
          Welcome to our app! This is a React frontend for a Windows system.
          Here are some of the pages and their functionality:
        </p>
        <ul className="page-list">
          <li className="page-item tag-green">
            <strong>Libraries</strong>: Displays a list of libraries. You can
            click on a library to view its details.
          </li>
          <li className="page-item tag-blue">
            <strong>Library</strong>: Displays the details of a library. You can
            also edit the library here.
          </li>
          <li className="page-item tag-pink">
            <strong>Media</strong>: Displays the details of a media item. You
            can also edit the media item here.
          </li>
          <li className="page-item tag-orange">
            <strong>Library Form</strong>: Allows you to create a new library or
            edit an existing one.
          </li>
          <li className="page-item tag-cyan">
            <strong>Update Library</strong>: Allows you to update the details of
            a library.
          </li>
          <li className="page-item tag-yellow">
            <strong>Search</strong>: Allows you to search for media in our
            database.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Home;
