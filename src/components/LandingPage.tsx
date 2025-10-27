import { Button } from '@/components/ui/button'
import { GraduationCap } from '@phosphor-icons/react'
import { motion } from 'framer-motion'

interface LandingPageProps {
  onEnter: () => void
}

export function LandingPage({ onEnter }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/10 flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-2xl"
      >
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-8 inline-block"
        >
          <div className="p-6 bg-primary rounded-3xl shadow-lg">
            <GraduationCap size={80} weight="duotone" className="text-primary-foreground" />
          </div>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-5xl md:text-6xl font-bold tracking-tight mb-4"
        >
          Homeschool Tracker
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-xl text-muted-foreground mb-12"
        >
          Track progress, manage assignments, and celebrate learning
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Button 
            onClick={onEnter}
            size="lg"
            className="text-lg px-12 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all"
          >
            Enter
          </Button>
        </motion.div>
      </motion.div>
    </div>
  )
}
