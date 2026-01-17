// Money type
export type Money = {
  amount: number
  currency?: string // defaults to 'USD' in logic
}

// Item type for RFP
export type RfpItem = {
  name: string
  quantity: number
  specs?: string
}

// Structured content for RFP
export type RfpStructuredContent = {
  items: RfpItem[]
  budget?: Money
  deliveryDays?: number
  paymentTerms?: string
  [key: string]: any // allow extra fields if needed
}

// Structured content for Proposal
export type ProposalStructuredContent = {
  price?: Money
  deliveryDays?: number
  warranty?: string
  notes?: string
  [key: string]: any // allow extra fields if needed
}

// Proposal type
export type Proposal = {
  id: string
  rfpId: string
  vendorId: string
  vendor?: {
    name: string
  }
  rawContent: string
  structuredContent: ProposalStructuredContent
  createdAt: string
}

// RFP type
export type Rfp = {
  id: string
  title?: string
  rawContent: string
  structuredContent: RfpStructuredContent
  createdAt: string
  vendors?: {
    vendor: {
      id: string
      name: string
      email: string
    }
  }[]
  proposals?: Proposal[]
  proposalEvaluation?: ProposalEvaluation
}

export interface ProposalEvaluation {
  id: string
  rfpId: string

  summary: {
    overview: string
    reasoning: {
      vendorId: string
      vendorName?: string
      pros: string[]
      cons: string[]
      score?: number
    }[]
  }

  recommendedId?: string
  createdAt: string
}
