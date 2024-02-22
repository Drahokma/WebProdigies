import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { pricingCards } from "@/lib/constants";
import clsx from "clsx";
import { Check } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="">
      <section className="flex flex-col items-center justify-center w-full h-full relative pt-36">
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] 
        bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />

        <p className="text-center"> 
          Run your agency in one place
        </p>
        <div className="bg-gradient-to-r from-primary to-secondary-foreground text-transparent bg-clip-text relative">
          <h1 className="text-9xl font-bold text-center md:text-[300px]"> Plura </h1>
        </div>
        <div className="flex justify-center items-center relative md:mt-[-70px]">
          <Image 
          src={`/assets/preview.png`}
          alt="banner image"
          height={1200}
          width={1200}
          className="rounded-tl-2xl rounded-tr-2xl border-2 border-muted" />
          <div className="bottom-0 top-[50%] bg-gradient-to-t 
          dark:from-background left-0 right-0 absolute z-10" />
        </div>
      </section>
      <section className="flex justify-center items-center flex-col gap-4 md:mt-20">
        <h2 className="text-4xl text-center">Choose what fits you right</h2>
        <p className="text-muted-foreground text-center">
          Our straitforward pricing is designed to fit your needs.
          If you are not <br /> sure what to choose, we can help you find the perfect plan.
        </p>
        <div className="flex   justify-center gap-4 flex-wrap mt-6">
          {pricingCards.map((card)=>(
            <Card 
            key={card.title}
            className={clsx('w-[300px] flex flex-col justify-between', {
              'border-2 border-primary': card.title==='Unlimited Saas'
            })}> 
              <CardHeader >
                <CardTitle
                className={clsx('',{'text-muted-foreground':card.title!=='Unlimited Sass',
                 })}>
                  {card.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                 <span className="text-4xl text-bold"> {card.price}</span>
                 <span className="text-muted-foreground">/m</span>
              </CardContent>
              <CardFooter className="flex flex-col items-start gap-4">
                <div>
                  {card.features.map((feature)=>(
                    <div
                    key={feature}
                    className="flex gap-2">
                      <Check className="text-muted-foreground "/>
                      <p>{feature}</p>
                    </div>
                  ))}
                </div>
                <Link href={`/agency?plan=${card.priceId}`} 
                className={clsx(
                  "w-full text-center bg-primary p-2 rounded-md",
                  {"!bg-muted-foreground":card.title==="Unlimited Saas"})}>
                    Get Started  
                  </Link>
              </CardFooter>
            </ Card> 
          ))}
        </div>
      </section>
    </main>
  );
}
