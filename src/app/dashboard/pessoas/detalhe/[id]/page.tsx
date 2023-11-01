import DetalhesDePessoas 
  from '../components/DetalhesDePessoas'

export default function Page({
  params 
}: { params: { id: string } }) {
  console.log(params.id)
  return (
    <div>
      <DetalhesDePessoas id={params.id} />
    </div>
  )
}
  