import Hero from "@/components/Hero/Hero.tsx"
import HomeSecond from "@/components/Hero/HeroSecond.tsx";
import NewDrops from "@/components/Hero/NewDrops.tsx"

const Home = () => {
  return (
    <div className="">
      <Hero/>
      <HomeSecond/>
      <NewDrops/>
    </div>
  )
}

export default Home;