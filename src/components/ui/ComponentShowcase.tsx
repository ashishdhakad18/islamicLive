import React from "react";
import { Button } from "@/components/ui/Button";
import { Chip } from "@/components/ui/Chip";
import CardSlider from "./CardSlider";
import { mockCampaignCards, mockEventCards } from "@/data/mockSliderData";
import NewsSection from "@/components/Homepage/NewsSection";
import ImpactHistorySection from "./ImpactHistorySection";
import HistoryTimelineSection from "./HistoryTimelineSection";

const ComponentShowcase = () => {
  return (
    <div className="p-8 space-y-12 bg-white dark:bg-grey-bg-dark min-h-screen">
      <section id="hero">
        <h2 className="type-h3 mb-6 dark:text-white">Buttons</h2>

        <div className="space-y-6">
          <div className="space-y-4">

            
            <h3 className="type-h5 mb-4 text-grey-grey dark:text-white">
              Solid Variants
            </h3>
            <div className="flex flex-wrap gap-4">
              <Button color="primary">Primary</Button>
              <Button color="teal">Teal</Button>
              <Button color="royal">Royal</Button>
              <Button color="green">Green</Button>
              <Button color="yellow">Yellow</Button>
              <Button color="red">Red</Button>
              <Button color="purple">Purple</Button>
              <Button color="grey">Grey</Button>
              {/* <h1 className="type-h1 text-grey-grey">Helloo</h1> */}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="type-h5 mb-4 text-grey-grey dark:text-white">
              Outline Variants
            </h3>
            <div className="flex flex-wrap gap-4">
              <Button variant="outline" color="primary">
                Primary
              </Button>
              <Button variant="outline" color="teal">
                Teal
              </Button>
              <Button variant="outline" color="royal">
                Royal
              </Button>
              <Button variant="outline" color="green">
                Green
              </Button>
              <Button variant="outline" color="yellow">
                Yellow
              </Button>
              <Button variant="outline" color="red">
                Red
              </Button>
              <Button variant="outline" color="purple">
                Purple
              </Button>
              <Button variant="outline" color="grey">
                Grey
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="type-h5 mb-4 text-grey-grey dark:text-white">
              Ghost Variants
            </h3>
            <div className="flex flex-wrap gap-4">
              <Button variant="ghost" color="primary">
                Primary
              </Button>
              <Button variant="ghost" color="teal">
                Teal
              </Button>
              <Button variant="ghost" color="royal">
                Royal
              </Button>
              <Button variant="ghost" color="green">
                Green
              </Button>
              <Button variant="ghost" color="yellow">
                Yellow
              </Button>
              <Button variant="ghost" color="red">
                Red
              </Button>
              <Button variant="ghost" color="purple">
                Purple
              </Button>
              <Button variant="ghost" color="grey">
                Grey
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="type-h5 mb-2 dark:text-white">Sizes</h3>
            <div className="flex items-center gap-4">
              <Button size="sm">Small</Button>
              <Button size="md">Medium</Button>
              <Button size="lg">Large</Button>
            </div>
          </div>
        </div>
      </section>

      <div className="border-t border-grey-divider my-8"></div>

      <section>
        <h2 className="type-h3 mb-6 dark:text-white">Chips</h2>

        <div className="space-y-6">
          <div className="space-y-4">
            <h3 className="type-h5 mb-2 dark:text-white">Solid Variants</h3>
            <div className="flex flex-wrap gap-4">
              <Chip label="Primary" color="primary" />
              <Chip label="Teal" color="teal" />
              <Chip label="Royal" color="royal" />
              <Chip label="Green" color="green" />
              <Chip label="Yellow" color="yellow" />
              <Chip label="Red" color="red" />
              <Chip label="Purple" color="purple" />
              <Chip label="Grey" color="grey" />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="type-h5 mb-2 dark:text-white">Outline Variants</h3>
            <div className="flex flex-wrap gap-4">
              <Chip variant="outline" label="Primary" color="primary" />
              <Chip variant="outline" label="Teal" color="teal" />
              <Chip variant="outline" label="Royal" color="royal" />
              <Chip variant="outline" label="Green" color="green" />
              <Chip variant="outline" label="Yellow" color="yellow" />
              <Chip variant="outline" label="Red" color="red" />
              <Chip variant="outline" label="Purple" color="purple" />
              <Chip variant="outline" label="Grey" color="grey" />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="type-h5 mb-2 dark:text-white">
              Interactive & Deletable
            </h3>
            <div className="flex flex-wrap gap-4">
              <Chip
                label="Click Me"
                onClick={() => alert("Clicked!")}
                color="primary"
              />
              <Chip
                label="Delete Me"
                onDelete={() => alert("Delete clicked!")}
                color="red"
              />
              <Chip
                label="Click & Delete"
                color="teal"
                onClick={() => alert("Clicked!")}
                onDelete={() => alert("Delete clicked!")}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-6">Upcoming Events</h2>
        <CardSlider
          cards={mockEventCards}
          slidesToShow={{ mobile: 1, tablet: 2, desktop: 4 }}
          gap={16}
        />
      </section>

      {/* Campaign Cards Slider */}
      <section>
        <h2 className="text-3xl font-bold mb-6">Active Campaigns</h2>
        <CardSlider
          cards={mockCampaignCards}
          slidesToShow={{ mobile: 1, tablet: 2, desktop: 3 }}
          // autoPlay={true}
          gap={24}
        />
      </section>

      {/* History Components */}

      <section>
        <div className="bg-grey-black text-white py-12 px-4 text-center">
          <h1 className="type-h2">Components Verification</h1>
          <p className="type-body-2 text-grey-grey mt-2">
            Verifying: ImpactHistorySection & HistoryTimelineSection
          </p>
        </div>

        <div className="flex flex-col gap-8">
          {/* Section 1: Impact History */}
          <div className="pt-12">
            <h2 className="text-center text-grey-black type-h4 mb-4">1. Impact History Section</h2>
            <ImpactHistorySection />
          </div>

          <hr className="border-grey-divider" />

          {/* Section 2: Timeline */}
          <div className="pb-12">
            <h2 className="text-center text-grey-black type-h4 mb-4">2. History Timeline Section</h2>
            <HistoryTimelineSection />
          </div>
        </div>
      </section>

      {/* News Section */}
      {/* <NewsSection /> */}
    </div>
  );
};

export default ComponentShowcase;
