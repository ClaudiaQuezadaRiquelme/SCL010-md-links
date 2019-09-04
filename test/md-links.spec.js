const mdLinks = require('../md-links.js');


describe('mdLinks es un objeto cuyos atributos son funciones', () => {
  describe('el atributo "callMarkdownLinkExtractor" es una función que retorna un arreglo de strings', () => {
    it('debería ser una objeto', () => {
      expect(typeof mdLinks.callMarkdownLinkExtractor('./md-files/readme-e.md',undefined)).toBe( 'object' );
    });
    it('debería ser una string', () => {
      expect(typeof mdLinks.callMarkdownLinkExtractor('./md-files/readme-e.md',undefined)[0]).toBe( 'string' );
    });
  }),
  describe('el atributo "returnTruncatedText" es una función que retorna un string truncado', () => {
    it('debería ser una string', () => {
      expect(typeof mdLinks.returnTruncatedText('HOLIHOLIHoliholiOLIOLIholiOLIholiHILIlilooLIHILihoLOAIliadsdASDFASDFASDFASDFASDFASDFASDFSADFSADFASDFSDFASDFDSFASDFASDFSDFSADFSDFASDFSDFSDFSADFASDFSDFSDFASDFASDFASDFASDFSADFSADFASDFASDFASDFASDFSADFSADFASDFSADFSADFASDFSADFadfsdfsdfasdfasdfasdfasdfasdfsdfasdfasdfasdfasdfasdfasdfsadfsadfsadfsadfsdafsadfsdafasdfasdfasdfsadfsadfsadfsadfsadfasdfsadfsadfasdfasdfsadfasdfsdafsdfjkafgfgjfjfgasdfhjgsdafjghasdfkhgsadfasdjghasdfjhgsdfajhgasdfasdhgasdfasjhgsadfasdfhgsadfasjghasdfaghasdfjhgsadfjhgsdfasdfjhgasdfasjdhgasdfajsdgasdfsadhjgasdfasdjhgasdfsadfjhgsdafadsfjhgasdfsdfhjgsadfasdfjhgsadfjafgsdajghasdfjkgadsfjhgasdfjgaskdfjhgasdfjadsfjsdafasdfjhfjasksdahasdjfgkjfgjfgfgjfgjhfgjhfgjhfgfgjhfgjfgjhfgjhfgjhfgjgfjhfgjfgasdfasdfasdfasdfasdfasdfasdfasdfjhgkjhgkjhgkjhgkjhgjhgkhgjkhgkjhgasdfasdfsadfasdfasdfasdfasdfasdfasdfjhgkjhgjhgjkhgjhgjkgjhgjhgjkhgkjgadsfasdfasdfasdfasdfasdfasdfasdfasdfjhgjhgjhggjhgkjhgkjhgjhggadfsasdfasdfasdfas')).toBe( 'string' );
    });
    it('debería retornar "HOLIHOLIHoliholiOLIOLIholiOLIholiHILIlilooLIHILiho"', () => {
      expect(mdLinks.returnTruncatedText('HOLIHOLIHoliholiOLIOLIholiOLIholiHILIlilooLIHILihoLOAIliadsdASDFASDFASDFASDFASDFASDFASDFSADFSADFASDFSDFASDFDSFASDFASDFSDFSADFSDFASDFSDFSDFSADFASDFSDFSDFASDFASDFASDFASDFSADFSADFASDFASDFASDFASDFSADFSADFASDFSADFSADFASDFSADFadfsdfsdfasdfasdfasdfasdfasdfsdfasdfasdfasdfasdfasdfasdfsadfsadfsadfsadfsdafsadfsdafasdfasdfasdfsadfsadfsadfsadfsadfasdfsadfsadfasdfasdfsadfasdfsdafsdfjkafgfgjfjfgasdfhjgsdafjghasdfkhgsadfasdjghasdfjhgsdfajhgasdfasdhgasdfasjhgsadfasdfhgsadfasjghasdfaghasdfjhgsadfjhgsdfasdfjhgasdfasjdhgasdfajsdgasdfsadhjgasdfasdjhgasdfsadfjhgsdafadsfjhgasdfsdfhjgsadfasdfjhgsadfjafgsdajghasdfjkgadsfjhgasdfjgaskdfjhgasdfjadsfjsdafasdfjhfjasksdahasdjfgkjfgjfgfgjfgjhfgjhfgjhfgfgjhfgjfgjhfgjhfgjhfgjgfjhfgjfgasdfasdfasdfasdfasdfasdfasdfasdfjhgkjhgkjhgkjhgkjhgjhgkhgjkhgkjhgasdfasdfsadfasdfasdfasdfasdfasdfasdfjhgkjhgjhgjkhgjhgjkgjhgjhgjkhgkjgadsfasdfasdfasdfasdfasdfasdfasdfasdfjhgjhgjhggjhgkjhgkjhgjhggadfsasdfasdfasdfas')).toBe( 'HOLIHOLIHoliholiOLIOLIholiOLIholiHILIlilooLIHILiho' );
    });
  })
    
});
