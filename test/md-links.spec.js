const mdLinks = require('../md-links.js');


describe('mdLinks es un objeto cuyos atributos son funciones', () => {
  describe('el atributo "callMarkdownLinkExtractor" es una función que retorna un arreglo de strings', () => {
    it('debería ser una objeto', () => {
      expect(typeof mdLinks.callMarkdownLinkExtractor('./md-files/readme-e.md',undefined)).toBe( 'object' );
    });
    it('debería ser una string', () => {
      expect(typeof mdLinks.callMarkdownLinkExtractor('./md-files/readme-e.md',undefined)[0]).toBe( 'string' );
    });
    describe('revisaremos lo retornado por el atributo "callMarkdownLinkExtractor"', () => {
      it('return.split("  ") debería devolver arreglo', () => {
        expect(typeof mdLinks.callMarkdownLinkExtractor('./md-files/readme-e.md',undefined)[0].split('  ')).toBe( 'object' );
      });
      it('return.split("  ") debería devolver arreglo con 3 string', () => {
        expect(typeof mdLinks.callMarkdownLinkExtractor('./md-files/readme-e.md',undefined)[0].split('  ')[0]).toBe( 'string' );
      });
      it('return.split("  ") debería devolver arreglo con 3 string y el primer string debe ser el directorio esperado', () => {
        expect(mdLinks.callMarkdownLinkExtractor('./md-files/readme-e.md',undefined)[0].split('  ')[0]).toBe( './md-files/readme-e.md' );
      });
      it('return.split("  ") debería devolver arreglo con 3 string y el segundo string debe ser el link esperado', () => {
        expect(mdLinks.callMarkdownLinkExtractor('./md-files/readme-e.md',undefined)[0].split('  ')[1]).toBe( 'https://travis-ci.org/sindresorhus/array-union.svg?branch=master' );
      });
      it('return.split("  ") debería devolver arreglo con 3 string y el tercer string debe ser el string esperado', () => {
        expect(mdLinks.callMarkdownLinkExtractor('./md-files/readme-e.md',undefined)[0].split('  ')[2]).toBe( 'HOLIHOLIHoliholiOLIOLIholiOLIholiHILIlilooLIHILiho' );
      });
    })
    
  }),
  describe('el atributo "returnTruncatedText" es una función que retorna un string truncado', () => {
    it('debería ser una string', () => {
      expect(typeof mdLinks.returnTruncatedText('HOLIHOLIHoliholiOLIOLIholiOLIholiHILIlilooLIHILihoLOAIliadsdASDFASDFASDFASDFASDFASDFASDFSADFSADFASDFSDFASDFDSFASDFASDFSDFSADFSDFASDFSDFSDFSADFASDFSDFSDFASDFASDFASDFASDFSADFSADFASDFASDFASDFASDFSADFSADFASDFSADFSADFASDFSADFadfsdfsdfasdfasdfasdfasdfasdfsdfasdfasdfasdfasdfasdfasdfsadfsadfsadfsadfsdafsadfsdafasdfasdfasdfsadfsadfsadfsadfsadfasdfsadfsadfasdfasdfsadfasdfsdafsdfjkafgfgjfjfgasdfhjgsdafjghasdfkhgsadfasdjghasdfjhgsdfajhgasdfasdhgasdfasjhgsadfasdfhgsadfasjghasdfaghasdfjhgsadfjhgsdfasdfjhgasdfasjdhgasdfajsdgasdfsadhjgasdfasdjhgasdfsadfjhgsdafadsfjhgasdfsdfhjgsadfasdfjhgsadfjafgsdajghasdfjkgadsfjhgasdfjgaskdfjhgasdfjadsfjsdafasdfjhfjasksdahasdjfgkjfgjfgfgjfgjhfgjhfgjhfgfgjhfgjfgjhfgjhfgjhfgjgfjhfgjfgasdfasdfasdfasdfasdfasdfasdfasdfjhgkjhgkjhgkjhgkjhgjhgkhgjkhgkjhgasdfasdfsadfasdfasdfasdfasdfasdfasdfjhgkjhgjhgjkhgjhgjkgjhgjhgjkhgkjgadsfasdfasdfasdfasdfasdfasdfasdfasdfjhgjhgjhggjhgkjhgkjhgjhggadfsasdfasdfasdfas')).toBe( 'string' );
    });
    it('debería retornar "HOLIHOLIHoliholiOLIOLIholiOLIholiHILIlilooLIHILiho"', () => {
      expect(mdLinks.returnTruncatedText('HOLIHOLIHoliholiOLIOLIholiOLIholiHILIlilooLIHILihoLOAIliadsdASDFASDFASDFASDFASDFASDFASDFSADFSADFASDFSDFASDFDSFASDFASDFSDFSADFSDFASDFSDFSDFSADFASDFSDFSDFASDFASDFASDFASDFSADFSADFASDFASDFASDFASDFSADFSADFASDFSADFSADFASDFSADFadfsdfsdfasdfasdfasdfasdfasdfsdfasdfasdfasdfasdfasdfasdfsadfsadfsadfsadfsdafsadfsdafasdfasdfasdfsadfsadfsadfsadfsadfasdfsadfsadfasdfasdfsadfasdfsdafsdfjkafgfgjfjfgasdfhjgsdafjghasdfkhgsadfasdjghasdfjhgsdfajhgasdfasdhgasdfasjhgsadfasdfhgsadfasjghasdfaghasdfjhgsadfjhgsdfasdfjhgasdfasjdhgasdfajsdgasdfsadhjgasdfasdjhgasdfsadfjhgsdafadsfjhgasdfsdfhjgsadfasdfjhgsadfjafgsdajghasdfjkgadsfjhgasdfjgaskdfjhgasdfjadsfjsdafasdfjhfjasksdahasdjfgkjfgjfgfgjfgjhfgjhfgjhfgfgjhfgjfgjhfgjhfgjhfgjgfjhfgjfgasdfasdfasdfasdfasdfasdfasdfasdfjhgkjhgkjhgkjhgkjhgjhgkhgjkhgkjhgasdfasdfsadfasdfasdfasdfasdfasdfasdfjhgkjhgjhgjkhgjhgjkgjhgjhgjkhgkjgadsfasdfasdfasdfasdfasdfasdfasdfasdfjhgjhgjhggjhgkjhgkjhgjhggadfsasdfasdfasdfas')).toBe( 'HOLIHOLIHoliholiOLIOLIholiOLIholiHILIlilooLIHILiho' );
    });
    it('el string retornado debería tener largo 50', () => {
      expect(mdLinks.returnTruncatedText('HOLIHOLIHoliholiOLIOLIholiOLIholiHILIlilooLIHILihoLOAIliadsdASDFASDFASDFASDFASDFASDFASDFSADFSADFASDFSDFASDFDSFASDFASDFSDFSADFSDFASDFSDFSDFSADFASDFSDFSDFASDFASDFASDFASDFSADFSADFASDFASDFASDFASDFSADFSADFASDFSADFSADFASDFSADFadfsdfsdfasdfasdfasdfasdfasdfsdfasdfasdfasdfasdfasdfasdfsadfsadfsadfsadfsdafsadfsdafasdfasdfasdfsadfsadfsadfsadfsadfasdfsadfsadfasdfasdfsadfasdfsdafsdfjkafgfgjfjfgasdfhjgsdafjghasdfkhgsadfasdjghasdfjhgsdfajhgasdfasdhgasdfasjhgsadfasdfhgsadfasjghasdfaghasdfjhgsadfjhgsdfasdfjhgasdfasjdhgasdfajsdgasdfsadhjgasdfasdjhgasdfsadfjhgsdafadsfjhgasdfsdfhjgsadfasdfjhgsadfjafgsdajghasdfjkgadsfjhgasdfjgaskdfjhgasdfjadsfjsdafasdfjhfjasksdahasdjfgkjfgjfgfgjfgjhfgjhfgjhfgfgjhfgjfgjhfgjhfgjhfgjgfjhfgjfgasdfasdfasdfasdfasdfasdfasdfasdfjhgkjhgkjhgkjhgkjhgjhgkhgjkhgkjhgasdfasdfsadfasdfasdfasdfasdfasdfasdfjhgkjhgjhgjkhgjhgjkgjhgjhgjkhgkjgadsfasdfasdfasdfasdfasdfasdfasdfasdfjhgjhgjhggjhgkjhgkjhgjhggadfsasdfasdfasdfas').length).toBe( 50 );
    });
  })
    
});
