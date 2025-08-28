import { Section } from "../shared/Section"
import { useEffect, useState, useRef } from "react"
import { motion } from "motion/react"
import { Star } from "lucide-react"
import tonyAvatar from "../../assets/avatars/tony.jpg"
import lynnAvatar from "../../assets/avatars/lynn.jpg"
import nicholasAvatar from "../../assets/avatars/nicholas.jpg"
import nyenzoAvatar from "../../assets/avatars/nyenzo.jpg"
import "../../styles/testimonials.css"
import "../../styles/cards.css"

export default function TestimonialsSection({ delay = 0 }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [testimonialHeight, setTestimonialHeight] = useState(200)
  const testimonialRef = useRef(null)
  
  const testimonials = [
    {
      name: "Tony Muriuki",
      location: "Nairobi, Kenya. 11, Aug 2025",
      quote: "Shawn is an incredibly resourceful and reliable teammate. His strong grasp of software engineering concepts and problem-solving skills made him a go-to person in our projects. He not only delivered high-quality work but also supported others, ensuring the whole team moved forward.",
      avatar: tonyAvatar
    },
    {
      name: "Lynn Mwende",
      location: "Nairobi, Kenya. 20, Aug 2025",
      quote: "Working with Shawn has been a great experience. He brings sharp technical skills, a strong work ethic, and a collaborative spirit to every project. Whenever we faced challenges, he always came up with creative and practical solutions that pushed the project to success",
      avatar: lynnAvatar
    },
    {
      name: "Nyenzo Sabwa",
      location: "Kisumu, Kenya. 15, July 2025",
      quote: "Shawn is one of the most dependable partners I have worked with. His technical expertise in software engineering is matched by his ability to share knowledge and support the team. He consistently adds value and makes collaboration seamless",
      avatar: nyenzoAvatar
    },
    {
      name: "Nicholas Musee",
      location: "Machakos, Kenya. 8, Aug 2025",
      quote: "Shawn is highly skilled in software engineering and always brings resourceful ideas to the table. A true team player!",
      avatar: nicholasAvatar
    }
  ]

  // Create a duplicated array for seamless looping
  const loopedTestimonials = [...testimonials, ...testimonials]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        const nextIndex = prev + 1
        // When we reach the end of the original testimonials, reset to 0
        if (nextIndex >= testimonials.length) {
          return 0
        }
        return nextIndex
      })
    }, 5000) // Slowed down to 5 seconds

    return () => clearInterval(interval)
  }, [testimonials.length])

  useEffect(() => {
    if (testimonialRef.current) {
      const testimonialElement = testimonialRef.current
      const height = testimonialElement.offsetHeight
      const marginBottom = parseInt(window.getComputedStyle(testimonialElement).marginBottom)
      const totalHeight = height + marginBottom
      setTestimonialHeight(totalHeight)
    }
  }, [])

  const MotionDiv = motion.div

  return (
    <Section delay={delay}>
      <div className="card-header">
        <div className="card-semi-header">
          <Star size={16} className="card-icon" />
          <p>LinkedIn</p>
        </div>
        <h3>Peer Recommendations</h3>
      </div>
      <div className="testimonials-carousel">
        <MotionDiv
          className="testimonials-track"
          animate={{ y: -currentIndex * testimonialHeight }}
          transition={{ 
            duration: 1.2, 
            ease: [0.4, 0.0, 0.2, 1] 
          }}
        >
          {loopedTestimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className={`testimonial ${index % 2 === 0 ? 'testimonial-even' : ''}`}
              ref={index === 0 ? testimonialRef : null}
            >
              <div className="testimonial-avatar">
                <img src={testimonial.avatar} alt={testimonial.name} />
              </div>
              <div className="testimonial-content">
                <div className="testimonial-name">{testimonial.name}</div>
                <div className="testimonial-location">{testimonial.location}</div>
                <div className="testimonial-quote">"{testimonial.quote}"</div>
              </div>
            </div>
          ))}
        </MotionDiv>
      </div>
    </Section>
  )
}


