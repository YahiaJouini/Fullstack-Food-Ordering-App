import Image from "next/image"
import Right from "../icons/Right"

const Hero = () => {
    return (
        <section className="hero mt-12">
            <div className="py-12">
                <h1 className="text-4xl font-[900] tracking-wide leading-[45px]">
                    Everything <br /> is better<br /> with&nbsp;
                    <span className="text-primary">ST EATS</span>
                </h1>
                <p className="my-4 text-gray-500 text-sm">
                    Your everyday is incomplete without the missing piece of delightful flavor that only great food can bring.
                </p>

                <div className="flex items-center gap-x-4 text-sm">
                    <button className="text-white px-4 py-2  border-none flex items-center justify-center gap-x-2 rounded-full bg-primary">
                        ORDER NOW  <Right className="w-6 h-6" />
                    </button>
                    <button className="flex justify-center items-center gap-x-1  font-bold">Learn More
                        <Right className="w-6 h-6 text-gray-600" />
                    </button>
                </div>
            </div>
            <div className="relative">

                <Image src="/pizza.png" fill className="object-contain" alt="pizza" />

            </div>
        </section>
    )
}

export default Hero