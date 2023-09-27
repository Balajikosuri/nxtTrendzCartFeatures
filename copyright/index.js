import './index.css'

function CopyrightBar() {
  return (
    <div className="my-dev-container">
      <p className="my-text">
        &copy; {new Date().getFullYear()}{' '}
        <span className="my-name">Balaji Kosuri</span>. For More
        <a
          className="anchor"
          rel="noreferrer"
          target="_blank"
          href="https://www.linkedin.com/in/balajikosuri"
        >
          Visit my LinkedIn
        </a>
      </p>
    </div>
  )
}

export default CopyrightBar
