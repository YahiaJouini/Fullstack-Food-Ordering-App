const SectionHeaders = ({ subHeader, mainHeader }: { subHeader: string, mainHeader: string }) => {
    return (
        <>
            <h3 className="text-gray-600 uppercase font-semibold leading-5">
                {subHeader}
            </h3>
            <h2 className="text-primary font-[900] text-4xl italic">
                {mainHeader}
            </h2>
        </>
    )
}

export default SectionHeaders