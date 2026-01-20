"use client"

import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react"
import { useEffect, useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Carousel, type CarouselApi, CarouselContent, CarouselItem } from "@/components/ui/carousel"

interface GalleryItem {
  id: string
  title: string
  summary: string
  url: string
  image: string
}

interface Gallery6Props {
  heading?: string
  demoUrl?: string
  items?: GalleryItem[]
}

const Gallery6 = ({
  heading = "Gallery",
  demoUrl = "https://www.vishwadev.tech",
  items = [
    {
      id: "item-1",
      title: "Build Modern UIs",
      summary: "Create stunning user interfaces with our comprehensive design system.",
      url: "#",
      image: "/placeholder.svg?height=300&width=450",
    },
    {
      id: "item-2",
      title: "Computer Vision Technology",
      summary:
        "Powerful image recognition and processing capabilities that allow AI systems to analyze, understand, and interpret visual information from the world.",
      url: "#",
      image: "/placeholder.svg?height=300&width=450",
    },
    {
      id: "item-3",
      title: "Machine Learning Automation",
      summary:
        "Self-improving algorithms that learn from data patterns to automate complex tasks and make intelligent decisions with minimal human intervention.",
      url: "#",
      image: "/placeholder.svg?height=300&width=450",
    },
    {
      id: "item-4",
      title: "Predictive Analytics",
      summary:
        "Advanced forecasting capabilities that analyze historical data to predict future trends and outcomes, helping businesses make data-driven decisions.",
      url: "#",
      image: "/placeholder.svg?height=300&width=450",
    },
    {
      id: "item-5",
      title: "Neural Network Architecture",
      summary:
        "Sophisticated AI models inspired by human brain structure, capable of solving complex problems through deep learning and pattern recognition.",
      url: "#",
      image: "/placeholder.svg?height=300&width=450",
    },
  ],
}: Gallery6Props) => {
  const [carouselApi, setCarouselApi] = useState<CarouselApi>()
  const [canScrollPrev, setCanScrollPrev] = useState(false)
  const [canScrollNext, setCanScrollNext] = useState(false)

  useEffect(() => {
    if (!carouselApi) {
      return
    }

    const updateSelection = () => {
      setCanScrollPrev(carouselApi.canScrollPrev())
      setCanScrollNext(carouselApi.canScrollNext())
    }

    updateSelection()
    carouselApi.on("select", updateSelection)

    return () => {
      carouselApi.off("select", updateSelection)
    }
  }, [carouselApi])

  return (
    <section className="py-12 sm:py-16 md:py-20">
      <div className="container px-4 sm:px-6">
        <div className="mb-6 sm:mb-8 flex flex-col justify-between md:mb-14 md:flex-row md:items-end lg:mb-16">
          <div>
            <h2 className="mb-3 text-2xl sm:text-3xl font-semibold md:mb-4 md:text-4xl lg:mb-6">{heading}</h2>
            <a
              href={demoUrl}
              className="group flex items-center gap-1 text-sm font-medium text-primary hover:text-primary/80 transition-colors md:text-base lg:text-lg"
            >
              Explore All Projects
              <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-1" />
            </a>
          </div>
          <div className="mt-6 sm:mt-8 flex shrink-0 items-center justify-start gap-2">
            <Button
              size="icon"
              variant="neutral"
              onClick={() => {
                carouselApi?.scrollPrev()
              }}
              disabled={!canScrollPrev}
              className="disabled:pointer-events-auto h-10 w-10 sm:h-12 sm:w-12"
            >
              <ArrowLeft className="size-4 sm:size-5" />
            </Button>
            <Button
              size="icon"
              variant="neutral"
              onClick={() => {
                carouselApi?.scrollNext()
              }}
              disabled={!canScrollNext}
              className="disabled:pointer-events-auto h-10 w-10 sm:h-12 sm:w-12"
            >
              <ArrowRight className="size-4 sm:size-5" />
            </Button>
          </div>
        </div>
      </div>
      <div className="w-full">
        <Carousel
          setApi={setCarouselApi}
          opts={{
            breakpoints: {
              "(max-width: 768px)": {
                dragFree: true,
              },
            },
          }}
          className="relative left-[-0.5rem] sm:left-[-1rem]"
        >
          <CarouselContent className="-mr-2 ml-4 sm:-mr-4 sm:ml-8 2xl:ml-[max(8rem,calc(50vw-700px+1rem))] 2xl:mr-[max(0rem,calc(50vw-700px-1rem))]">
            {items.map((item) => (
              <CarouselItem key={item.id} className="pl-2 sm:pl-4 basis-[85%] sm:basis-auto md:max-w-[452px]">
                <a href={item.url} className="group flex flex-col justify-between">
                  <div>
                    <div className="flex aspect-[3/2] overflow-clip rounded-lg sm:rounded-xl bg-muted border hover:shadow-lg transition-all duration-300">
                      <div className="flex-1">
                        <div className="relative h-full w-full origin-bottom transition duration-300 group-hover:scale-105">
                          <Image
                            src={item.image || "/placeholder.svg"}
                            alt={item.title}
                            fill
                            className="object-cover object-center rounded-lg sm:rounded-xl"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-lg sm:rounded-xl"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mb-2 line-clamp-2 sm:line-clamp-3 break-words pt-3 sm:pt-4 text-base sm:text-lg font-medium md:mb-3 md:pt-4 md:text-xl lg:pt-4 lg:text-2xl">
                    {item.title}
                  </div>
                  <div className="mb-6 sm:mb-8 line-clamp-2 text-sm text-muted-foreground md:mb-12 md:text-base lg:mb-9">
                    {item.summary}
                  </div>
                  <div className="flex items-center text-sm text-primary group-hover:text-primary/80 transition-colors">
                    Read more <ArrowRight className="ml-2 size-4 sm:size-5 transition-transform group-hover:translate-x-1" />
                  </div>
                </a>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  )
}

export { Gallery6 }
