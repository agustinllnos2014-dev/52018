import UsuarioVisitor from './generated/UsuarioVisitor.js';

export default class CustomUsuarioVisitor extends UsuarioVisitor {
    
    visitPrograma(ctx) {
        let jsCode = `function crearUsuario(id, atributos) {\n`;
        jsCode += `  console.log(\`Creando usuario: \${id}\`);\n`;
        jsCode += `  atributos.forEach(({ clave, valor }) => {\n`;
        jsCode += `    console.log(\`\t\${clave} = \${valor}\`);\n`;
        jsCode += `  });\n}\n\n`;

        const usuarios = ctx.usuario();
        if (usuarios) {
            usuarios.forEach(usr => {
                jsCode += this.visit(usr) + '\n';
            });
        }
        return jsCode;
    }

    visitUsuario(ctx) {
        const id = ctx.identificador().getText();
        let attrsCode = `crearUsuario("${id}", [\n`;
        
        const atributos = ctx.atributo();
        if (atributos && atributos.length > 0) {
            const attrsList = atributos.map(attr => this.visit(attr));
            attrsCode += attrsList.join(',\n');
        }
        
        attrsCode += `\n]);`;
        return attrsCode;
    }

    visitAtributo(ctx) {
        const clave = ctx.identificador().getText();
        const val = this.visit(ctx.valor());
        return `  { clave: "${clave}", valor: ${val} }`;
    }

    visitValor(ctx) {
        if (ctx.numero()) return ctx.numero().getText();
        if (ctx.cadena()) return ctx.cadena().getText();
        if (ctx.booleano()) {
            return ctx.booleano().getText() === 'verdadero' ? 'true' : 'false';
        }
    }
}
