function KeplrConnectError({ closeFunc }) {
  return (
    <dialog className="keplrError" open>
      <article>
        <header>
          <a
            href="#close"
            aria-label="Close"
            className="close"
            onClick={closeFunc}
          >
            <i aria-hidden="true"></i>
          </a>
          <h3>Could not connect with Keplr Wallet</h3>
        </header>
        <p>
          Keplr Wallet Chrome Extension is required to utilize the Rocket Launchpad. Please note the Launchpad
          cannot be used from mobile devices at this time.
        </p>
        <hr></hr>
        <ul>
          <li>
            Install Keplr Wallet at{" "}
            <a href={"http://keplr.app"} target={"_blank"} rel="noreferrer">
              http://keplr.app
            </a>
          </li>
          <li>
            If you have Keplr wallet installed and available, please try closing
            this modal and the site will attempt to detect it again.
          </li>
        </ul>
      </article>
    </dialog>
  );
}

export default KeplrConnectError;
