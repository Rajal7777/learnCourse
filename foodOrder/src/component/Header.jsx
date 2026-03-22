import cartImage from '../assets/logo.jpg';

export default function Header({ title }) {
    return (
        <div id="main-header">
          <div id="title">
              <img src={cartImage} alt="logo" />
            <h2 id="title">
                {title}
            </h2>
          </div>
        </div>

    );
}