'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useState } from 'react';
import { X } from 'lucide-react';
import MediaDisplay from './MediaDisplay';

const STORIES = [
  {
    id: 1,
    title: 'The Art of Weaving Dreams',
    hook: 'Where skilled hands transform threads into stories of hope and dignity',
    media: '/videos/WhatsApp Video 2026-04-03 at 12.28.22 AM.mp4',
    mediaType: 'video' as 'video' | 'image',
    category: 'Craftsmanship',
    fullStory: {
      before: 'In a world that often overlooks those with disabilities, many talented individuals found themselves without opportunities to showcase their skills or earn a livelihood.',
      struggle: 'The journey was not easy. Learning to operate traditional looms, mastering intricate patterns, and building confidence took time, patience, and unwavering support from the Anandwan community.',
      transformation: 'Today, the weaving workshop at Anandwan stands as a beacon of possibility. Artisans create beautiful handwoven textiles that are sold across India, each piece carrying the story of resilience and skill.',
      present: 'The workshop now employs over 30 artisans, each earning a dignified livelihood while preserving traditional weaving techniques. Their work is not just about fabric—it\'s about weaving dignity into every thread.',
      quote: 'Every thread I weave is a thread of my own story—one of transformation, purpose, and pride.',
    },
  },
  {
    id: 2,
    title: 'Threads of Transformation',
    hook: 'Where sewing machines hum with the rhythm of new beginnings',
    media: '/videos/WhatsApp Video 2026-04-03 at 12.28.23 AM.mp4',
    mediaType: 'video' as 'video' | 'image',
    category: 'Tailoring',
    fullStory: {
      before: 'Many residents arrived at Anandwan with little more than hope. Skills were dormant, confidence was shattered, and the future seemed uncertain.',
      struggle: 'The sewing workshop became a place of learning and healing. Each stitch was a step forward, each garment a testament to growing confidence and capability.',
      transformation: 'Through dedicated training and mentorship, individuals discovered not just a skill, but a calling. The workshop transformed from a training center into a thriving production unit.',
      present: 'Today, the tailoring unit produces high-quality garments for schools, hospitals, and retail. Over 40 skilled tailors work here, each with their own story of transformation.',
      quote: 'I came here broken. I leave every day whole. That\'s the magic of this place.',
    },
  },
  {
    id: 3,
    title: 'Melodies of Resilience',
    hook: 'Where music becomes the language of the soul, transcending all barriers',
    media: '/videos/WhatsApp Video 2026-04-03 at 12.28.27 AM.mp4',
    mediaType: 'video' as 'video' | 'image',
    category: 'Performing Arts',
    fullStory: {
      before: 'Music has always been a universal language, but for many at Anandwan, it became a lifeline—a way to express what words could not convey.',
      struggle: 'Learning instruments, finding rhythm, and building the courage to perform required immense dedication. But music has a way of healing that goes beyond technique.',
      transformation: 'The music program at Anandwan evolved into a celebrated cultural initiative. Performances began to draw audiences from across the region, changing perceptions about ability and talent.',
      present: 'The Anandwan music troupe now performs at major cultural events, inspiring thousands. Musicians here prove that talent knows no boundaries, and art can emerge from any circumstance.',
      quote: 'When I play, I am not defined by my limitations. I am defined by my music.',
    },
  },
  {
    id: 4,
    title: 'Crafting Purpose',
    hook: 'Where creativity meets determination, producing beauty from raw materials',
    media: '/videos/WhatsApp Video 2026-04-03 at 12.28.30 AM.mp4',
    mediaType: 'video' as 'video' | 'image',
    category: 'Handicrafts',
    fullStory: {
      before: 'Traditional crafts were dying arts, and those with disabilities were rarely given the chance to learn or practice them.',
      struggle: 'The handicraft workshop started small, with basic materials and simple designs. Progress was slow, but determination was unwavering.',
      transformation: 'As skills developed, so did creativity. Artisans began experimenting with designs, colors, and techniques, creating unique products that caught the attention of buyers nationwide.',
      present: 'The handicraft unit now produces a diverse range of products—from decorative items to functional crafts. Each piece is a work of art, and each artisan is a master of their craft.',
      quote: 'My hands create beauty. That is my power, my identity, my contribution to the world.',
    },
  },
  {
    id: 5,
    title: 'The Power of Community',
    hook: 'Where collective strength builds individual dignity and shared prosperity',
    media: '/images/WhatsApp Image 2026-04-03 at 12.28.19 AM.jpeg',
    mediaType: 'image' as 'video' | 'image',
    category: 'Community Life',
    fullStory: {
      before: 'Isolation and marginalization were the reality for many before coming to Anandwan. Society had turned its back, and hope was a distant dream.',
      struggle: 'Building a community from individuals who had experienced rejection required patience, empathy, and a shared vision of dignity for all.',
      transformation: 'Slowly, Anandwan became more than a place—it became a family. Residents supported each other, celebrated together, and built a culture of mutual respect and empowerment.',
      present: 'Today, Anandwan is a thriving community of over 2,000 residents. It\'s a place where everyone belongs, everyone contributes, and everyone matters.',
      quote: 'Anandwan gave me more than a home. It gave me a family, a purpose, and a reason to believe in tomorrow.',
    },
  },
];

export default function SpecialAbilities() {
  const [selectedStory, setSelectedStory] = useState<any>(null);

  return (
    <>
      <section className="relative py-24 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Section Title */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="font-serif text-6xl md:text-7xl text-vintage-ink mb-6">
              Our Special Abilities
            </h2>
            <p className="font-handwritten text-2xl md:text-3xl text-vintage-sepia max-w-3xl mx-auto">
              Stories of transformation, skill, and unwavering human spirit
            </p>
          </motion.div>

          {/* Story Cards Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {STORIES.map((story, index) => (
              <StoryCard
                key={story.id}
                story={story}
                index={index}
                onClick={() => setSelectedStory(story)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Full Story Modal */}
      {selectedStory && (
        <FullStoryExperience
          story={selectedStory}
          onClose={() => setSelectedStory(null)}
        />
      )}
    </>
  );
}

function StoryCard({ story, index, onClick }: any) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={onClick}
      className="cursor-pointer group"
      style={{ perspective: '1000px' }}
    >
      <motion.div
        animate={{
          rotateY: isHovered ? 3 : 0,
          scale: isHovered ? 1.03 : 1,
          y: isHovered ? -8 : 0,
        }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="relative"
        style={{ transformStyle: 'preserve-3d' }}
      >
        <div className="letter-card overflow-hidden">
          {/* Media Container */}
          <div className="relative h-80 bg-vintage-sepia/10 overflow-hidden">
            <MediaDisplay
              src={story.media}
              type={story.mediaType}
              alt={story.title}
              autoPlay={isHovered}
              muted={true}
              loop={true}
              className="absolute inset-0"
            />
            
            {/* Category Badge */}
            <div className="absolute top-4 left-4 z-10">
              <span className="ink-stamp text-xs">{story.category}</span>
            </div>

            {/* Hover Overlay */}
            <motion.div
              animate={{
                opacity: isHovered ? 1 : 0,
              }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 bg-vintage-ink/60 flex items-center justify-center"
            >
              <p className="font-handwritten text-white text-xl px-6 text-center">
                Explore Story
              </p>
            </motion.div>

            {/* Glow Effect */}
            <motion.div
              animate={{
                opacity: isHovered ? 0.4 : 0,
                scale: isHovered ? 1.2 : 0.8,
              }}
              transition={{ duration: 0.4 }}
              className="absolute inset-0 bg-gradient-radial from-vintage-stamp/40 to-transparent"
            />
          </div>

          {/* Content */}
          <div className="p-6">
            <h3 className="font-serif text-2xl text-vintage-ink mb-3 group-hover:text-vintage-stamp transition-colors">
              {story.title}
            </h3>
            <p className="font-typewriter text-sm text-vintage-fade leading-relaxed">
              {story.hook}
            </p>
          </div>
        </div>

        {/* Shadow */}
        <motion.div
          animate={{
            opacity: isHovered ? 0.3 : 0.15,
            scale: isHovered ? 1.05 : 1,
          }}
          transition={{ duration: 0.4 }}
          className="absolute inset-0 bg-vintage-ink/20 blur-xl -z-10 transform translate-y-4"
        />
      </motion.div>
    </motion.div>
  );
}

function FullStoryExperience({ story, onClose }: any) {
  const { scrollYProgress } = useScroll();
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 overflow-y-auto"
    >
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="fixed inset-0 bg-vintage-ink/90 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Content */}
      <div className="relative min-h-screen py-12 px-4">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="fixed top-8 right-8 z-50 w-12 h-12 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors group"
        >
          <X className="w-6 h-6 text-vintage-ink group-hover:rotate-90 transition-transform duration-300" />
        </button>

        {/* Story Content */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          {/* Hero Section */}
          <div className="letter-card p-8 md:p-16 mb-8">
            {/* Category */}
            <div className="mb-6">
              <span className="ink-stamp">{story.category}</span>
            </div>

            {/* Title */}
            <h1 className="font-serif text-5xl md:text-6xl text-vintage-ink mb-8">
              {story.title}
            </h1>

            {/* Hero Media */}
            <motion.div
              style={{ y: backgroundY }}
              className="h-96 rounded-sm mb-12 overflow-hidden"
            >
              <MediaDisplay
                src={story.media}
                type={story.mediaType}
                alt={story.title}
                autoPlay={true}
                muted={true}
                loop={true}
                controls={true}
                className="h-full"
              />
            </motion.div>

            {/* Story Timeline */}
            <div className="space-y-12">
              <StorySection title="Before" content={story.fullStory.before} />
              <StorySection title="The Struggle" content={story.fullStory.struggle} />
              <StorySection title="Transformation" content={story.fullStory.transformation} />
              <StorySection title="Present Day" content={story.fullStory.present} />

              {/* Quote */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="border-l-4 border-vintage-stamp pl-8 py-6 bg-vintage-paper/50"
              >
                <p className="font-handwritten text-2xl md:text-3xl text-vintage-sepia italic leading-relaxed">
                  "{story.fullStory.quote}"
                </p>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

function StorySection({ title, content }: { title: string; content: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="relative"
    >
      <h3 className="font-serif text-3xl text-vintage-stamp mb-4">{title}</h3>
      <p className="font-typewriter text-vintage-ink/90 leading-relaxed text-lg">
        {content}
      </p>
    </motion.div>
  );
}
