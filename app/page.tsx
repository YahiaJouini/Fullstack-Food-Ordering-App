import Hero from "./components/layout/Hero";
import HomeMenu from "./components/layout/HomeMenu";
import SectionHeaders from "./components/layout/SectionHeaders";


export default function Home() {
  return (
    <>
      <Hero />
      <HomeMenu />
      <section className="my-16 text-center">

        <SectionHeaders
          subHeader="OUR STORY"
          mainHeader="About Us" />

        <div className="text-gray-500 max-w-2xl mx-auto mt-4 flex flex-col gap-y-4">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facere, corporis necessitatibus consequuntur accusantium nostrum perspiciatis. Atque assumenda maxime, vitae odit dolorum ipsa a distinctio quam vel dicta natus praesentium porro.

          </p>

          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Odit nam dolore officiis cum accusantium itaque molestias maxime nulla, aliquam dolorem delectus expedita aperiam facilis, ut, at explicabo doloribus ullam laborum.
          </p>

          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita odio aspernatur veniam dolorem debitis asperiores illum omnis quod voluptate.</p>
        </div>

      </section>


      <section className=" my-8 text-center">
        <SectionHeaders
          subHeader="DON&apos;T HESITATE"
          mainHeader="Contact Us" />

        <div className="mt-8">
          <a className="text-4xl font-medium underline text-gray-500" href="tel:+46731648810">

            +46 731 648 810
          </a>
        </div>
      </section>



    </>
  );
}
