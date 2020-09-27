export default {
  name: 'NDocumentSign',
  props: {
    /**
     * id: number,
     * authorId: number,
     * documentId: number,
     * recordId: number,
     * tableName: string,
     * isApproved: boolean,
     * answer: object,
     * checkUrl: string,
     * signedAt: timestamp,
     * createdAt: timestamp,
     */
    sign: { type: Object, default: () => {}, },
    title: { type: String, default: '', },
    authorId: { type: Number, default: 0, },
  
    doSign: { type: Function, default: () => {}, },
  },
}
