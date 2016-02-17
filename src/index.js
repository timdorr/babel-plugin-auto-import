export default ({ types: t }) => {
  const ReactDefaultImport = t.importDefaultSpecifier( t.identifier('React') )

  function ReactImport() {
    let declar = t.importDeclaration(
      [ ReactDefaultImport ],
      t.stringLiteral('react')
    )
    declar._blockHoist = 3

    return declar
  }

  function addReactImport(file) {
    if (!file._reactImported) {
      if (file._reactImport) {
        file._reactImport.specifiers.insertBefore(ReactDefaultImport)
      } else {
        file.path.unshiftContainer('body', ReactImport())
      }

      file._reactImported = true
    }
  }

  return {
    visitor: {
      ImportDeclaration({ node }, { file }) {
        if (t.isStringLiteral(node.source) && node.source.value === 'react') {
          file._reactImport = node

          const reactImports = node.specifiers
              .filter(spec => t.isImportDefaultSpecifier(spec) && spec.local.name === 'React')

          if (reactImports.length > 0)
            file._reactImported = true
        }
      },

      // Auto import React
      JSXElement(path, { file }) {
        addReactImport(file)
      },

      Program() {
      }
    }
  }
}
