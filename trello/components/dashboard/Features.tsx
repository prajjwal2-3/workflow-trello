import tags from '../../public/tags.svg'
import shareun from '../../public/shareun.svg'
import access from '../../public/access.svg'

export default function Features() {
    const images = [tags, shareun, access]
    const data = [{
        title: 'Introducing tags',
        description: 'Easily categorize and find your notes by adding tags. Keep your workspace clutter-free and efficient.',
        image: images[0]
    }, {
        title: 'Share Notes Instantly',
        description: 'Effortlessly share your notes with others via email or link. Enhance collaboration with quick sharing options.',
        image: images[1]
    }, {
        title: 'Access Anywhere',
        description: `Sync your notes across all devices. Stay productive whether you're on your phone, tablet, or computer.`,
        image: images[2]
    }]
  return (
    
        <section className="grid grid-cols-3 gap-4">
            {data.map((item, index) => (
                <section key={index} className="flex bg-white rounded-md flex-row gap-2 p-3">
                    <img src={item.image.src} alt={item.title} className="w-24 h-24"/>
                   <section>
                   <h2 className="text-xl text-[#757575] font-semibold">{item.title}</h2>
                   <p className="text-sm text-[#868686] font-normal">{item.description}</p>
                   </section>
                </section>
            ))}
        </section>
    
  )
}
