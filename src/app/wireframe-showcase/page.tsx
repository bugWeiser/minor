"use client";

import React, { useState } from "react";
import {
  Navbar,
  Sidebar,
  Breadcrumbs,
  TabNav,
  HeroSection,
  FeatureCard,
  ContentCard,
  TestimonialBlock,
  PricingCard,
  StatsRow,
  TextInput,
  TextArea,
  SelectInput,
  Checkbox,
  RadioButton,
  Toggle,
  SearchBar,
  FormGroup,
  Button,
  IconButton,
  ButtonGroup,
  Alert,
  Toast,
  Modal,
  EmptyState,
  Skeleton,
  ProgressBar,
  Table,
  Avatar,
  Badge,
  Tooltip,
  Accordion,
  AccordionItem,
  PageContainer,
  TwoColumnLayout,
  ThreeColumnGrid,
  SidebarLayout,
  Footer,
  ImagePlaceholder,
  Divider,
} from "@/components/wireframe";
import {
  HiOutlineHeart,
  HiOutlineFaceSmile,
  HiOutlineChartBar,
  HiOutlineGlobeAlt,
  HiOutlineHome,
  HiOutlineShoppingBag,
  HiOutlineCog6Tooth,
  HiOutlineChatBubbleOvalLeft,
  HiOutlineBell,
  HiOutlineUser,
} from "react-icons/hi2";

export default function WireframeShowcase() {
  const [activeTab, setActiveTab] = useState("buttons");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [showCode, setShowCode] = useState(false);

  const navLinks = [
    { label: "Home", href: "#" },
    { label: "Shop", href: "#" },
    { label: "Blog", href: "#" },
    { label: "Contact", href: "#" },
  ];

  const sidebarLinks = [
    { label: "Dashboard", href: "#", icon: <HiOutlineHome />, isActive: true },
    { label: "Orders", href: "#", icon: <HiOutlineShoppingBag />, count: 12 },
    { label: "Customers", href: "#", icon: <HiOutlineUser /> },
    { label: "Reports", href: "#", icon: <HiOutlineChartBar /> },
    { label: "Alerts", href: "#", icon: <HiOutlineBell />, count: 4 },
    { label: "Settings", href: "#", icon: <HiOutlineCog6Tooth /> },
  ];

  const breadcrumbItems = [
    { label: "Home", href: "#", icon: <HiOutlineHome /> },
    { label: "Store", href: "#" },
    { label: "Products", href: "#" },
    { label: "Sketches", href: "#", isActive: true },
  ];

  const tabs = [
    { label: "Buttons", id: "buttons", icon: <HiOutlineHeart />, isActive: activeTab === "buttons" },
    { label: "Forms", id: "forms", icon: <HiOutlineChatBubbleOvalLeft />, isActive: activeTab === "forms" },
    { label: "Cards", id: "cards", icon: <HiOutlineGlobeAlt />, isActive: activeTab === "cards" },
    { label: "Feedback", id: "feedback", icon: <HiOutlineBell />, isActive: activeTab === "feedback" },
  ];

  const stats = [
    { label: "Total Views", value: "84.2K", icon: <HiOutlineChartBar /> },
    { label: "New Users", value: "+1.2K", icon: <HiOutlineUser /> },
    { label: "Happy Clients", value: "98%", icon: <HiOutlineFaceSmile /> },
    { label: "Global Reach", value: "142", icon: <HiOutlineGlobeAlt /> },
  ];

  const footerSections = [
    {
      title: "Solutions",
      links: [
        { label: "Wireframing", href: "#" },
        { label: "Design", href: "#" },
        { label: "Strategy", href: "#" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About", href: "#" },
        { label: "Jobs", href: "#" },
        { label: "History", href: "#" },
      ],
    },
    {
      title: "Support",
      links: [
        { label: "Pricing", href: "#" },
        { label: "Docs", href: "#" },
        { label: "Community", href: "#" },
      ],
    },
  ];

  const sectionHeading = (title: string) => (
    <div className="mb-20">
      <h2 className="font-sketch text-5xl font-black text-pencil border-b-4 border-pencil border-dashed pb-4 mb-2 -rotate-[1deg] w-fit pr-10">
        📌 {title}
      </h2>
      <p className="font-body text-pencil-light text-lg">Wireframe components for {title.toLowerCase()} system.</p>
    </div>
  );

  return (
    <div className="bg-paper min-h-screen">
      <Navbar
        logo="PaperWire"
        navLinks={navLinks}
        ctaButton={<Button size="sm">Download Kit</Button>}
      />

      <HeroSection
        title="The Paper Wireframe Kit"
        subtitle="Experience a rough, minimal, and paper-textured aesthetic for your Next.js prototypes. Built with Tailwind CSS and Passion."
        ctaText="Start Sketching"
      />

      <PageContainer className="py-24 space-y-40">
        {/* BUTTONS SECTION */}
        <section id="buttons">
          {sectionHeading("Buttons & Actions")}
          <div className="flex flex-wrap items-center gap-10">
            <Button variant="primary">Primary Button</Button>
            <Button variant="secondary">Secondary Action</Button>
            <Button variant="ghost">Ghost Link</Button>
            <Button variant="danger">Danger Zone</Button>
            <Button variant="cta">Call to Action</Button>
          </div>
          
          <div className="mt-12 flex flex-wrap items-center gap-10">
             <IconButton variant="primary" size="lg"><HiOutlineFaceSmile /></IconButton>
             <IconButton variant="secondary"><HiOutlineHeart /></IconButton>
             <IconButton variant="ghost" size="sm"><HiOutlineBell /></IconButton>
             <Button loading>Processing...</Button>
          </div>

          <div className="mt-12">
             <ButtonGroup>
                <Button variant="secondary">Left</Button>
                <Button variant="secondary">Middle</Button>
                <Button variant="secondary">Right</Button>
             </ButtonGroup>
          </div>
        </section>

        {/* FORMS SECTION */}
        <section id="forms">
          {sectionHeading("Interactive Forms")}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div className="space-y-10">
               <FormGroup label="Sketch Name" helperText="Your full sketching handle" required>
                  <TextInput placeholder="Enter name..." />
               </FormGroup>
               
               <FormGroup label="Special Request" error="Input field is trembling">
                  <TextArea placeholder="Tell us more about your rough ideas..." />
               </FormGroup>
               
               <FormGroup label="Experience Level">
                  <SelectInput 
                    options={[
                      { label: "Doodler", value: "doodler" },
                      { label: "Sketcher", value: "sketcher" },
                      { label: "Artist", value: "artist" }
                    ]} 
                  />
               </FormGroup>
            </div>
            
            <div className="space-y-12 bg-white/40 p-10 border-2 border-pencil border-dotted rounded-sm rotate-[1deg]">
               <div className="-rotate-[1deg] space-y-10">
                  <h4 className="font-sketch text-3xl font-black mb-6 border-b-2 border-pencil w-fit">Controls</h4>
                  <Checkbox label="Send me a physical paper copy" />
                  <RadioButton label="Monthly Newsletter" defaultChecked />
                  <RadioButton label="Annual Digest" />
                  <Toggle label="Enable Dynamic Shadows" defaultChecked />
                  <SearchBar placeholder="Looking for a specific sketch..." />
               </div>
            </div>
          </div>
        </section>

        {/* CONTENT SECTION */}
        <section id="cards">
          {sectionHeading("Content Layouts")}
          <ThreeColumnGrid>
            <FeatureCard 
              title="Hand-Drawn" 
              description="Each component is meticulously designed to feel rough and hand-drawn, keeping prototypes focused on UX."
              icon={<HiOutlineHeart className="w-8 h-8" />}
            />
            <FeatureCard 
              title="Tailwind Native" 
              description="No external heavy libraries. Just standard Tailwind CSS utilities combined with custom design tokens."
              icon={<HiOutlineGlobeAlt className="w-8 h-8" />}
            />
            <FeatureCard 
              title="Extremely Fast" 
              description="Minimal bundle size. Components work out of the box with standard React patterns."
              icon={<HiOutlineChartBar className="w-8 h-8" />}
            />
          </ThreeColumnGrid>

          <div className="mt-24">
            <TwoColumnLayout 
              left={
                <ContentCard 
                  title="Sketchy Prototypes" 
                  description="High-fidelity wireframes that invite feedback without being distracted by final styling choices."
                  actionText="View Collection"
                  imageHeight="320px"
                />
              }
              right={
                <TestimonialBlock 
                  quote="This kit transformed my design process. The client immediately understood we were talking about structure, not final colors. Total game changer."
                  author="Sarah Scribble"
                  role="UX Strategist"
                  avatar={<HiOutlineUser className="w-8 h-8" />}
                />
              }
            />
          </div>
          
          <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-12">
             <PricingCard tier="Draft" price="$0" features={["10 Sketches", "Basic Components", "Community Support"]} />
             <PricingCard tier="Ink" price="$29" features={["Unlimited Sketches", "All Components", "Priority Support"]} popular />
             <PricingCard tier="Canvas" price="$99" features={["Custom Theming", "Team Collaboration", "Direct Design Support"]} />
          </div>
        </section>

        {/* DATA DISPLAY SECTION */}
        <section id="data">
          {sectionHeading("Data & Metadata")}
          <div className="space-y-16">
            <StatsRow stats={stats} />
            
            <Breadcrumbs items={breadcrumbItems} />
            
            <TabNav
              tabs={tabs}
              onTabChange={(id) => setActiveTab(id)}
            />

            <div className="py-10">
              <Table 
                headers={["Product", "Status", "Designer", "Amount"]}
                rows={[
                  ["Sketch Pad Pro", <Badge variant="success">Shipped</Badge>, "Leo da Vinci", "$142.00"],
                  ["Pencil Kit v2", <Badge variant="warning">In Transit</Badge>, "Sarah S.", "$24.50"],
                  ["Rough Ink", <Badge variant="danger">Refilled</Badge>, "Mike A.", "$10.00"],
                ]}
                pagination={
                   <div className="flex gap-2">
                      <Button size="sm" variant="secondary">Prev</Button>
                      <Button size="sm" variant="secondary">Next</Button>
                   </div>
                }
              />
            </div>

            <div className="flex flex-wrap items-center gap-12 py-10">
               <div className="flex items-center gap-4">
                  <Avatar fallback="SD" size="lg" status="online" />
                  <Avatar fallback="TS" size="md" status="away" />
                  <Avatar fallback="AP" size="sm" status="offline" />
               </div>
               
               <div className="flex flex-wrap items-center gap-4">
                  <Badge variant="primary">New Feature</Badge>
                  <Badge variant="success">Fixed</Badge>
                  <Badge variant="warning">Alert</Badge>
                  <Badge variant="danger">Critical</Badge>
                  <Badge variant="secondary">Experimental</Badge>
               </div>
               
               <div className="flex items-center gap-5">
                  <Tooltip text="I'm a sketchy tooltip!" position="top">
                     <Button variant="secondary">Hover Me</Button>
                  </Tooltip>
                  <Tooltip text="Right side here" position="right">
                     <HiOutlineBell className="w-8 h-8 text-pencil cursor-help animate-bounce" />
                  </Tooltip>
               </div>
            </div>

            <Accordion className="max-w-2xl">
               <AccordionItem title="Is this kit free to use?">
                  Absolutely! This is a recreation of the Figma community file for Next.js users.
               </AccordionItem>
               <AccordionItem title="How does the hover effect work?">
                  We use Tailwind's hover:rotate and transition utilities to create a lively, sketchy feel.
               </AccordionItem>
               <AccordionItem title="Can I combine it with Shadcn?">
                  Yes, but the visual style might conflict unless you adapt Shadcn's theme.
               </AccordionItem>
            </Accordion>
          </div>
        </section>

        {/* FEEDBACK SECTION */}
        <section id="feedback">
          {sectionHeading("Feedback & States")}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-12">
               <Alert variant="info" title="Draft Saved">The latest changes to your sketch have been saved to the local ink buffer.</Alert>
               <Alert variant="error" title="Spilled Ink">We encountered an issue while rendering your rough edges. Please retry.</Alert>
               
               <ProgressBar label="Sharpening Pencils" value={65} showValue />
               
               <div className="space-y-6">
                  <Skeleton height="60px" width="100%" />
                  <div className="flex gap-4">
                    <Skeleton height="80px" width="80px" variant="circular" />
                    <div className="flex-1 space-y-4">
                      <Skeleton height="20px" width="70%" />
                      <Skeleton height="20px" width="40%" />
                    </div>
                  </div>
               </div>
            </div>
            
            <div className="space-y-12">
               <EmptyState 
                 title="No Sketches Found" 
                 message="Looks like you haven't started your masterpiece yet. Grab a pencil and begin!"
                 actionText="Start Doodling"
               />
               
               <div className="flex gap-10">
                  <Button onClick={() => setIsModalOpen(true)}>Open Modal</Button>
                  <Button variant="secondary" onClick={() => setShowToast(true)}>Show Toast</Button>
               </div>
            </div>
          </div>
        </section>
        
        {/* FIGMA REFERENCE */}
        <section className="pt-20 border-t-4 border-pencil border-dashed">
          <div className="mb-12">
             <h2 className="font-sketch text-5xl font-black text-pencil mb-4 -rotate-1">Figma Reference Source</h2>
             <p className="font-body text-pencil-light italic">Check the original community kit that inspired these components.</p>
          </div>
          <iframe 
            src="https://embed.figma.com/design/p47NL74icsRSAFuLWj9UCr/Paper-Wireframe-Kit--Community-?node-id=5190-533&embed-host=share"
            className="w-full h-[600px] rounded-sm border-4 border-pencil shadow-[10px_10px_0_#c4c4c4] rotate-[0.2deg]"
            allowFullScreen
          />
        </section>
      </PageContainer>

      {/* FEEDBACK OVERLAYS */}
      {showToast && (
        <Toast 
          message="Drawing complete! Saving to sketchbook..." 
          variant="success" 
          onClose={() => setShowToast(false)} 
        />
      )}
      
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        title="Rough Sketch Modal"
        footer={
           <div className="flex gap-6">
              <Button variant="secondary" size="sm" onClick={() => setIsModalOpen(false)}>Cancel</Button>
              <Button size="sm" onClick={() => setIsModalOpen(false)}>Proceed</Button>
           </div>
        }
      >
        <div className="space-y-8">
           <p>This is a modal with sketchy borders and shadows. Notice the slight rotation on the container and the dashed dividers.</p>
           <ImagePlaceholder height="240px" />
           <p>Its rough aesthetic helps keep conversations focused on application flow and information architecture rather than pixel-perfect polish.</p>
        </div>
      </Modal>

      <Footer 
        sections={footerSections} 
        logo="PaperWire" 
      />
    </div>
  );
}
