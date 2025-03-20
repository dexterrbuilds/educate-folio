
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { ChevronRight, Upload, Check } from 'lucide-react';

interface StepProps {
  onNext: () => void;
  onBack?: () => void;
}


const SpecializationStep = ({ onNext, onBack }: StepProps) => (
  <div className="space-y-6 step-content">
    <h2 className="text-2xl font-semibold mb-8">What do you specialize in?</h2>
    <div className="space-y-4">
      <Label className="form-label">Your specialization</Label>
      <Input 
        className="input-field" 
        placeholder="e.g., Mathematics, Physics, Language"
      />
    </div>
    <Button className="btn-primary mt-6" onClick={onNext}>
      Continue
    </Button>
  </div>
);

const ContentTypesStep = ({ onNext, onBack }: StepProps) => (
  <div className="space-y-6 step-content">
    <h2 className="text-2xl font-semibold mb-8">What type of content will you share?</h2>
    <div className="space-y-4">
      {['Videos', 'Documents', 'Audio'].map((type) => (
        <label key={type} className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-secondary">
          <input type="checkbox" className="w-5 h-5 mr-3" />
          <span>{type}</span>
        </label>
      ))}
    </div>
    <Button className="btn-primary mt-6" onClick={onNext}>
      Continue
    </Button>
  </div>
);

const DescriptionStep = ({ onNext, onBack }: StepProps) => (
  <div className="space-y-6 step-content">
    <h2 className="text-2xl font-semibold mb-8">Tell us about yourself</h2>
    <div className="space-y-4">
      <Label className="form-label">Your description</Label>
      <Textarea 
        className="input-field min-h-[150px]" 
        placeholder="Share your teaching experience and approach..."
      />
    </div>
    <Button className="btn-primary mt-6" onClick={onNext}>
      Continue
    </Button>
  </div>
);

const QualificationsStep = ({ onNext, onBack }: StepProps) => (
  <div className="space-y-6 step-content">
    <h2 className="text-2xl font-semibold mb-8">Upload your qualifications</h2>
    <div className="border-2 border-dashed rounded-lg p-8 text-center">
      <Upload className="w-8 h-8 mx-auto mb-4 text-foreground/40" />
      <p className="text-sm text-foreground/60">
        Drop your files here or click to upload
      </p>
    </div>
    <Button className="btn-primary mt-6" onClick={onNext}>
      Continue
    </Button>
  </div>
);

const ObjectivesStep = ({ onNext, onBack }: StepProps) => (
  <div className="space-y-6 step-content">
    <h2 className="text-2xl font-semibold mb-8">What are your objectives?</h2>
    <div className="space-y-4">
      <Label className="form-label">Your teaching objectives</Label>
      <Textarea 
        className="input-field min-h-[150px]" 
        placeholder="What do you want to achieve as an educator?"
      />
    </div>
    <Button className="btn-primary mt-6" onClick={onNext}>
      Continue
    </Button>
  </div>
);

const SocialMediaStep = ({ onNext, onBack }: StepProps) => (
  <div className="space-y-6 step-content">
    <h2 className="text-2xl font-semibold mb-8">Connect your social media</h2>
    <div className="space-y-4">
      {['LinkedIn', 'Twitter', 'Instagram', 'Youtube', 'Coursera', 'Udemy'].map((platform) => (
        <div key={platform} className="space-y-2">
          <Label className="form-label">{platform}</Label>
          <Input 
            className="input-field" 
            placeholder={`Your ${platform} profile URL`}
          />
        </div>
      ))}
    </div>
    <Button className="btn-primary mt-6" onClick={onNext}>
      Continue
    </Button>
  </div>
);

const PaymentStep = ({ onNext, onBack }: StepProps) => (
  <div className="space-y-6 step-content">
    <h2 className="text-2xl font-semibold mb-8">Set up payments</h2>
    <div className="space-y-4">
      <Label className="form-label">Payment methods</Label>
      {['Bank Transfer', 'PayPal', 'Stripe', 'Paystack'].map((method) => (
        <label key={method} className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-secondary">
          <input type="radio" name="payment" className="w-5 h-5 mr-3" />
          <span>{method}</span>
        </label>
      ))}
    </div>
    <Button className="btn-primary mt-6" onClick={onNext}>
      Complete Setup
    </Button>
  </div>
);

const OnboardingForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const navigate = useNavigate();

  const steps = [
    SpecializationStep,
    ContentTypesStep,
    DescriptionStep,
    QualificationsStep,
    ObjectivesStep,
    SocialMediaStep,
    PaymentStep,
  ];

  const CurrentStepComponent = steps[currentStep];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-md mx-auto p-6">
        <div className="flex mb-8">
          {steps.map((_, index) => (
            <div
              key={index}
              className={`h-1 flex-1 mr-1 rounded ${
                index <= currentStep ? 'bg-primary' : 'bg-secondary'
              }`}
            />
          ))}
        </div>
        <CurrentStepComponent
          onNext={handleNext}
          onBack={() => setCurrentStep(currentStep - 1)}
        />
      </div>
    </div>
  );
};

export default OnboardingForm;
