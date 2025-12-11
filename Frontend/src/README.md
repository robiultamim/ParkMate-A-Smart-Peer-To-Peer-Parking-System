# Parkmate - Smart Parking Solution

A comprehensive parking app that connects drivers with available parking spaces while helping property owners monetize their unused spots.

## Features

### For Drivers
- **Smart Search**: Find available parking spots with advanced filters
- **Real-time Availability**: Live updates on parking spot availability
- **Mobile Payments**: Secure payments through bKash, Nagad, Rocket, and cards
- **GPS Navigation**: Get directions to your reserved parking spot
- **Vehicle Support**: Cars, motorcycles, trucks, and commercial vehicles
- **Booking Management**: View, modify, and cancel reservations

### For Space Owners (Hosts)
- **Space Management**: List and manage parking spaces
- **Dynamic Pricing**: Set rates by vehicle type and time
- **Booking Control**: Approve or decline parking requests
- **Revenue Analytics**: Track earnings and performance
- **Mobile Wallet Integration**: Withdraw earnings to bKash, Nagad, etc.
- **Verification System**: Admin-verified listings for trust and safety

### For Administrators
- **User Verification**: Review and approve host applications
- **Dispute Resolution**: Handle conflicts between users
- **Platform Analytics**: Monitor system performance and user behavior
- **Revenue Management**: Track platform commissions and fees
- **Security Controls**: Manage platform security and compliance

## Technology Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS v4.0
- **UI Components**: Radix UI primitives with custom styling
- **Icons**: Lucide React
- **Charts**: Recharts for analytics
- **Forms**: React Hook Form with validation
- **Notifications**: Sonner for toast notifications

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Modern web browser

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/parkmate.git
   cd parkmate
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

## Project Structure

```
parkmate/
├── components/
│   ├── pages/          # Page components
│   ├── ui/             # Reusable UI components
│   ├── figma/          # Figma-specific components
│   ├── DesktopHeader.tsx
│   └── DesktopSidebar.tsx
├── styles/
│   └── globals.css     # Global styles and Tailwind config
├── guidelines/
│   └── Guidelines.md   # Development guidelines
├── App.tsx             # Main application component
└── package.json
```

## User Roles

### Driver
- Search and book parking spots
- Make payments through mobile wallets
- Rate and review parking spaces
- Manage vehicle information

### Host (Space Owner)
- List parking spaces for rent
- Set pricing and availability
- Manage booking requests
- Track earnings and analytics

### Admin
- Verify new hosts and properties
- Handle user disputes
- Monitor platform performance
- Manage system settings

## Payment Integration

Parkmate supports multiple payment methods:
- **bKash**: Bangladesh's leading mobile financial service
- **Nagad**: Government-backed mobile wallet
- **Rocket**: Dutch-Bangla Bank's mobile banking
- **Credit/Debit Cards**: Traditional card payments

## Mobile Wallet Features

- Instant payment processing
- Secure transaction handling
- Real-time payment confirmations
- Automatic receipts and invoicing
- Commission-based revenue model

## Security Features

- Admin verification for all hosts
- Secure payment processing
- User rating and review system
- 24/7 platform monitoring
- Dispute resolution system

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support, email support@parkmate.com or join our community chat.

## Roadmap

- [ ] Mobile app development (React Native)
- [ ] Advanced analytics dashboard
- [ ] IoT integration for smart parking
- [ ] Multi-language support
- [ ] API for third-party integrations
- [ ] Machine learning for demand prediction

---

Built with ❤️ by the Parkmate Team