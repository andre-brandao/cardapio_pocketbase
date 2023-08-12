/**
* This file was @generated using pocketbase-typegen
*/

export enum Collections {
	ChatPousada = "chat_pousada",
	PedidosPousada = "pedidos_pousada",
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

export type PedidosPousadaRecord = {
	cliente: RecordIdString
	produto: RecordIdString
	status: string
	local_consumo?: string
}

export type ProdutosPousadaRecord = {
	subcategoria: string
	categoria: string
	nome: string
	foto?: string
	descricao?: string
	quantidade?: number
	preco: number
	preco_para_dois?: number
	em_estoque: boolean
	vegano: boolean
}

export type UsersRecord = {
	name?: string
	avatar?: string
	unidade?: string
	observacao?: string
}

// Response types include system fields and match responses from the PocketBase API
export type ChatPousadaResponse<Texpand = unknown> = Required<ChatPousadaRecord> & BaseSystemFields<Texpand>
export type PedidosPousadaResponse<Texpand = unknown> = Required<PedidosPousadaRecord> & BaseSystemFields<Texpand>
export type ProdutosPousadaResponse<Texpand = unknown> = Required<ProdutosPousadaRecord> & BaseSystemFields<Texpand>
export type UsersResponse<Texpand = unknown> = Required<UsersRecord> & AuthSystemFields<Texpand>

// Types containing all Records and Responses, useful for creating typing helper functions

export type CollectionRecords = {
	chat_pousada: ChatPousadaRecord
	pedidos_pousada: PedidosPousadaRecord
	produtos_pousada: ProdutosPousadaRecord
	users: UsersRecord
}

export type CollectionResponses = {
	chat_pousada: ChatPousadaResponse
	pedidos_pousada: PedidosPousadaResponse
	produtos_pousada: ProdutosPousadaResponse
	users: UsersResponse
}