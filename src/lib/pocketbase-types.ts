/**
* This file was @generated using pocketbase-typegen
*/

export enum Collections {
	ChatPousada = "chat_pousada",
	PedidoPousada = "pedido_pousada",
	Pedidov2Pousada = "pedidov2_pousada",
	ProdutosPousada = "produtos_pousada",
	Users = "users",
}

// Alias types for improved usability
export type IsoDateString = string
export type RecordIdString = string
export type HTMLString = string

// System fields
export type BaseSystemFields<T = never> = {
	id: RecordIdString
	created: IsoDateString
	updated: IsoDateString
	collectionId: string
	collectionName: Collections
	expand?: T
}

export type AuthSystemFields<T = never> = {
	email: string
	emailVisibility: boolean
	username: string
	verified: boolean
} & BaseSystemFields<T>

// Record types for each collection

export type ChatPousadaRecord = {
	cliente: RecordIdString
	user: RecordIdString
	text: string
}

export type PedidoPousadaRecord = {
	produto: RecordIdString
	user: RecordIdString
	confirmado?: boolean
	cancelado?: boolean
}

export type Pedidov2PousadaRecord = {
	user?: RecordIdString
	produto: RecordIdString
	unidade: string
	status: string
}

export type ProdutosPousadaRecord = {
	subcategoria: string
	categoria: string
	nome: string
	descricao?: string
	quantidade?: number
	preco: number
	preco_para_dois?: number
	em_estoque?: boolean
	foto?: string
}

export type UsersRecord = {
	name?: string
	avatar?: string
}

// Response types include system fields and match responses from the PocketBase API
export type ChatPousadaResponse<Texpand = unknown> = Required<ChatPousadaRecord> & BaseSystemFields<Texpand>
export type PedidoPousadaResponse<Texpand = unknown> = Required<PedidoPousadaRecord> & BaseSystemFields<Texpand>
export type Pedidov2PousadaResponse<Texpand = unknown> = Required<Pedidov2PousadaRecord> & BaseSystemFields<Texpand>
export type ProdutosPousadaResponse<Texpand = unknown> = Required<ProdutosPousadaRecord> & BaseSystemFields<Texpand>
export type UsersResponse<Texpand = unknown> = Required<UsersRecord> & AuthSystemFields<Texpand>

// Types containing all Records and Responses, useful for creating typing helper functions

export type CollectionRecords = {
	chat_pousada: ChatPousadaRecord
	pedido_pousada: PedidoPousadaRecord
	pedidov2_pousada: Pedidov2PousadaRecord
	produtos_pousada: ProdutosPousadaRecord
	users: UsersRecord
}

export type CollectionResponses = {
	chat_pousada: ChatPousadaResponse
	pedido_pousada: PedidoPousadaResponse
	pedidov2_pousada: Pedidov2PousadaResponse
	produtos_pousada: ProdutosPousadaResponse
	users: UsersResponse
}