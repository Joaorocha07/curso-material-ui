import DetalheDeCidades 
  from '../components/DetalheDeCidades'

export default function Page({
  params 
}: { params: { id: string } }) {
  console.log(params.id)
  return (
    <div>
      <DetalheDeCidades id={params.id} />
    </div>
  )
}
  