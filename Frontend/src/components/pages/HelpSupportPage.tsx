import { useState } from "react";
import {
  HelpCircle,
  Search,
  MessageCircle,
  Phone,
  Mail,
  Book,
  Video,
  Users,
  ChevronDown,
  ChevronRight,
  Star,
  Clock,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../ui/collapsible";

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: "booking" | "payment" | "account" | "technical";
}

interface SupportTicket {
  id: string;
  subject: string;
  status: "open" | "in-progress" | "resolved";
  priority: "low" | "medium" | "high";
  created: string;
}

export function HelpSupportPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [openFAQs, setOpenFAQs] = useState<string[]>([]);

  const faqs: FAQ[] = [
    {
      id: "1",
      question: "How do I book a parking spot?",
      answer: "To book a parking spot, simply search for your destination, browse available spots, select your preferred location, choose your duration, and confirm your booking with payment.",
      category: "booking",
    },
    {
      id: "2",
      question: "What payment methods are accepted?",
      answer: "We accept bKash, Nagad, Rocket, credit/debit cards, and cash payments. Mobile wallet payments are processed instantly for immediate booking confirmation.",
      category: "payment",
    },
    {
      id: "3",
      question: "Can I cancel or modify my booking?",
      answer: "Yes, you can cancel or modify your booking up to 30 minutes before your reserved time. Cancellations made within 30 minutes may incur a small fee.",
      category: "booking",
    },
    {
      id: "4",
      question: "How do I become a parking space host?",
      answer: "To become a host, click 'List Your Space' on the home page, provide space details and photos, set your pricing, and complete verification. You'll start earning once approved.",
      category: "account",
    },
    {
      id: "5",
      question: "What if I can't find my booked parking spot?",
      answer: "Use the GPS navigation feature in the app to get turn-by-turn directions. If you still can't locate it, contact support immediately for assistance.",
      category: "technical",
    },
    {
      id: "6",
      question: "How do I withdraw my earnings as a host?",
      answer: "Go to your host dashboard, click 'Withdraw Earnings', select your preferred mobile wallet (bKash/Nagad), enter the amount, and confirm. Funds are transferred within 24 hours.",
      category: "payment",
    },
  ];

  const supportTickets: SupportTicket[] = [
    {
      id: "T001",
      subject: "Payment not processed for booking #12345",
      status: "in-progress",
      priority: "high",
      created: "2 hours ago",
    },
    {
      id: "T002",
      subject: "Unable to access GPS navigation",
      status: "open",
      priority: "medium",
      created: "1 day ago",
    },
    {
      id: "T003",
      subject: "Booking cancellation refund pending",
      status: "resolved",
      priority: "low",
      created: "3 days ago",
    },
  ];

  const toggleFAQ = (faqId: string) => {
    setOpenFAQs(prev => 
      prev.includes(faqId) 
        ? prev.filter(id => id !== faqId)
        : [...prev, faqId]
    );
  };

  const filteredFAQs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "open":
        return "bg-red-100 text-red-800";
      case "in-progress":
        return "bg-yellow-100 text-yellow-800";
      case "resolved":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "open":
        return <AlertCircle className="w-4 h-4" />;
      case "in-progress":
        return <Clock className="w-4 h-4" />;
      case "resolved":
        return <CheckCircle className="w-4 h-4" />;
      default:
        return <HelpCircle className="w-4 h-4" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "text-red-600";
      case "medium":
        return "text-yellow-600";
      case "low":
        return "text-green-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 pt-20">
      <div className="max-w-6xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center">
              <HelpCircle className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Help & Support</h1>
              <p className="text-gray-600">Get help and support for ParkMate</p>
            </div>
          </div>
        </div>

        <Tabs defaultValue="faq" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="faq">FAQ</TabsTrigger>
            <TabsTrigger value="contact">Contact</TabsTrigger>
            <TabsTrigger value="tickets">My Tickets</TabsTrigger>
            <TabsTrigger value="guides">Guides</TabsTrigger>
          </TabsList>

          {/* FAQ Tab */}
          <TabsContent value="faq" className="space-y-6">
            {/* Search */}
            <Card className="p-6">
              <div className="flex items-center gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search frequently asked questions..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Button variant="outline">
                  Search
                </Button>
              </div>
            </Card>

            {/* FAQ Categories */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {["booking", "payment", "account", "technical"].map((category) => (
                <Card 
                  key={category} 
                  className="p-4 cursor-pointer hover:bg-purple-50 transition-colors"
                  onClick={() => setSearchQuery(category)}
                >
                  <div className="text-center">
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                      {category === "booking" && <Book className="w-6 h-6 text-purple-600" />}
                      {category === "payment" && <MessageCircle className="w-6 h-6 text-purple-600" />}
                      {category === "account" && <Users className="w-6 h-6 text-purple-600" />}
                      {category === "technical" && <HelpCircle className="w-6 h-6 text-purple-600" />}
                    </div>
                    <h3 className="font-medium capitalize">{category}</h3>
                    <p className="text-sm text-gray-500">
                      {faqs.filter(faq => faq.category === category).length} questions
                    </p>
                  </div>
                </Card>
              ))}
            </div>

            {/* FAQ List */}
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4">
                {searchQuery ? `Search Results (${filteredFAQs.length})` : "Frequently Asked Questions"}
              </h3>
              <div className="space-y-2">
                {filteredFAQs.map((faq) => (
                  <Collapsible key={faq.id} open={openFAQs.includes(faq.id)}>
                    <CollapsibleTrigger
                      className="flex items-center justify-between w-full p-4 text-left bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
                      onClick={() => toggleFAQ(faq.id)}
                    >
                      <div className="flex items-center gap-3">
                        <Badge variant="outline" className="capitalize">
                          {faq.category}
                        </Badge>
                        <span className="font-medium">{faq.question}</span>
                      </div>
                      {openFAQs.includes(faq.id) ? (
                        <ChevronDown className="w-4 h-4" />
                      ) : (
                        <ChevronRight className="w-4 h-4" />
                      )}
                    </CollapsibleTrigger>
                    <CollapsibleContent className="p-4 bg-white border-l-4 border-purple-200 ml-4">
                      <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                      <div className="mt-4 flex items-center gap-2">
                        <span className="text-sm text-gray-500">Was this helpful?</span>
                        <Button variant="ghost" size="sm">
                          <Star className="w-4 h-4 mr-1" />
                          Yes
                        </Button>
                        <Button variant="ghost" size="sm">No</Button>
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                ))}
              </div>
            </Card>
          </TabsContent>

          {/* Contact Tab */}
          <TabsContent value="contact" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Contact Methods */}
              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-4">Get in Touch</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-4 bg-purple-50 rounded-lg">
                    <MessageCircle className="w-8 h-8 text-purple-600" />
                    <div>
                      <h4 className="font-medium">Live Chat</h4>
                      <p className="text-sm text-gray-600">Available 24/7</p>
                    </div>
                    <Button className="ml-auto">Chat Now</Button>
                  </div>
                  <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-lg">
                    <Phone className="w-8 h-8 text-blue-600" />
                    <div>
                      <h4 className="font-medium">Phone Support</h4>
                      <p className="text-sm text-gray-600">+880 1234-567890</p>
                    </div>
                    <Button variant="outline" className="ml-auto">Call</Button>
                  </div>
                  <div className="flex items-center gap-4 p-4 bg-green-50 rounded-lg">
                    <Mail className="w-8 h-8 text-green-600" />
                    <div>
                      <h4 className="font-medium">Email Support</h4>
                      <p className="text-sm text-gray-600">support@parkmate.com</p>
                    </div>
                    <Button variant="outline" className="ml-auto">Email</Button>
                  </div>
                </div>
              </Card>

              {/* Contact Form */}
              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-4">Send us a Message</h3>
                <form className="space-y-4">
                  <div>
                    <Label htmlFor="subject">Subject</Label>
                    <Input id="subject" placeholder="Brief description of your issue" />
                  </div>
                  <div>
                    <Label htmlFor="category">Category</Label>
                    <select className="w-full p-2 border border-gray-300 rounded-lg">
                      <option>Select a category</option>
                      <option>Booking Issue</option>
                      <option>Payment Problem</option>
                      <option>Account Question</option>
                      <option>Technical Support</option>
                      <option>Feature Request</option>
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="priority">Priority</Label>
                    <select className="w-full p-2 border border-gray-300 rounded-lg">
                      <option>Select priority</option>
                      <option>Low</option>
                      <option>Medium</option>
                      <option>High</option>
                      <option>Urgent</option>
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="message">Message</Label>
                    <Textarea 
                      id="message" 
                      placeholder="Describe your issue in detail..." 
                      rows={4}
                    />
                  </div>
                  <Button className="w-full">Send Message</Button>
                </form>
              </Card>
            </div>
          </TabsContent>

          {/* Support Tickets Tab */}
          <TabsContent value="tickets" className="space-y-6">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold">My Support Tickets</h3>
                <Button>
                  <MessageCircle className="w-4 h-4 mr-2" />
                  New Ticket
                </Button>
              </div>
              <div className="space-y-4">
                {supportTickets.map((ticket) => (
                  <Card key={ticket.id} className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-mono text-sm text-gray-500">#{ticket.id}</span>
                          <Badge className={getStatusColor(ticket.status)}>
                            {getStatusIcon(ticket.status)}
                            <span className="ml-1 capitalize">{ticket.status.replace('-', ' ')}</span>
                          </Badge>
                          <Badge variant="outline" className={getPriorityColor(ticket.priority)}>
                            {ticket.priority.toUpperCase()}
                          </Badge>
                        </div>
                        <h4 className="font-medium">{ticket.subject}</h4>
                        <p className="text-sm text-gray-500">Created {ticket.created}</p>
                      </div>
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </Card>
          </TabsContent>

          {/* Guides Tab */}
          <TabsContent value="guides" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="p-6 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <Book className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="font-semibold mb-2">Getting Started Guide</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Learn how to use ParkMate for the first time
                </p>
                <Button variant="outline" size="sm">Read Guide</Button>
              </Card>

              <Card className="p-6 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Video className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-semibold mb-2">Video Tutorials</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Step-by-step video guides for common tasks
                </p>
                <Button variant="outline" size="sm">Watch Videos</Button>
              </Card>

              <Card className="p-6 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="font-semibold mb-2">Host Guide</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Complete guide to hosting parking spaces
                </p>
                <Button variant="outline" size="sm">Learn More</Button>
              </Card>

              <Card className="p-6 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
                  <MessageCircle className="w-6 h-6 text-yellow-600" />
                </div>
                <h3 className="font-semibold mb-2">Payment Guide</h3>
                <p className="text-sm text-gray-600 mb-4">
                  How to set up and use mobile wallet payments
                </p>
                <Button variant="outline" size="sm">Read More</Button>
              </Card>

              <Card className="p-6 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                  <HelpCircle className="w-6 h-6 text-red-600" />
                </div>
                <h3 className="font-semibold mb-2">Troubleshooting</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Common issues and their solutions
                </p>
                <Button variant="outline" size="sm">View Solutions</Button>
              </Card>

              <Card className="p-6 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                  <Star className="w-6 h-6 text-indigo-600" />
                </div>
                <h3 className="font-semibold mb-2">Tips & Tricks</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Get the most out of ParkMate features
                </p>
                <Button variant="outline" size="sm">Discover Tips</Button>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}