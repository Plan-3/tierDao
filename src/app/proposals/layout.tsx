
export const revalidate = 30
export const metadata = {
  title: "Proposals"
}
export default function ProposalLayout({children}: {children: React.ReactNode }){
  return(
    <div>
      {children}
    </div>
  )
}