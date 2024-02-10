import Item from "../Menu/Item"
import SectionHeaders from "./SectionHeaders"

const HomeMenu = () => {
  return (
    <section className="">
      <div className="text-center my-10">
        <SectionHeaders subHeader="CHECK OUR"
          mainHeader="MENU"
        />
      </div>
      <div className="grid grid-cols-3 gap-6 mt-12">

        <Item />
        <Item />
        <Item />
        <Item />
        <Item />
        <Item />


      </div>

    </section>
  )
}

export default HomeMenu