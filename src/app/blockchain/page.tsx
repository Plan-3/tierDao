import Nav from "../proposals/Nav"
import BlockProposals from "./BlockProposals"

function page() {
  return (
    <div>
      <Nav />
      <div>
        <BlockProposals />
      </div>
    </div>
  )
}

export default page