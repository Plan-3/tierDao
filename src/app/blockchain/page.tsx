import Nav from "../proposals/Nav"
import BlockProposals from "./BlockProposals"
import Signer from "./Signer"

function page() {
  return (
    <div>
      <Nav />
      <div>
        <Signer />
        <BlockProposals />
      </div>
    </div>
  )
}

export default page