
import { CardHeader, CardContent, Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function ContactForm() {
  return (
    <Card className="space-y-4 ml-4 mr-4 mb-4 ">
      <CardHeader>
        <h2 className="text-3xl font-bold m-auto">Contact Us</h2>
        <p className="text-gray-500 dark:text-gray-400">
          We would love to hear from you! Please fill out this form and we will get in touch with you shortly.
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="first-name">First Name</Label>
              <Input id="first-name" placeholder="Enter your first name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="last-name">Last Name</Label>
              <Input id="last-name" placeholder="Enter your last name" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" placeholder="Enter your email" type="email" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="message">Message</Label>
            <Textarea className="min-h-[100px]" id="message" placeholder="Enter your message" />
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="terms" />
            <Label htmlFor="terms">
              I agree to the{" "}
              <Link className="underline underline-offset-2" href="#">
                Terms & Conditions
              </Link>
            </Label>
          </div>
          <Button type="submit">Submit</Button>
        </div>
      </CardContent>
    </Card>
  )
}

