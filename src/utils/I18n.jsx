import React from 'react'
import { useTranslation } from 'react-i18next'
import brasil from '../localAssets/brazil.png'
import eua from '../localAssets/eua.png'
// useTranslation é um hook
// que devolve uma função de tradução (t) e a instância do i18n

// Importa as bandeiras (imagens e componente)
import Flag from './Flag.jsx'

export const I18n = () => {
  const { i18n } = useTranslation()
  // Instância do i18n

  function handleChangeLanguage(language) {
    // Trocando o idioma na chamada da função
    i18n.changeLanguage(language)
  }

  const selectedLanguage = i18n.language // Idioma selecionado
  return (
    <div className="fixed bottom-4 left-4 flex gap-4 z-10">
      <Flag
        image={brasil}
        isSelected={selectedLanguage === 'pt-BR'} // Verifica o idioma escolhido
        onClick={() => handleChangeLanguage('pt-BR')} // Troca o idioma para pt-BR
      />

      <Flag
        image={eua}
        isSelected={selectedLanguage === 'en-US'} // Verifica o idioma escolhido
        onClick={() => handleChangeLanguage('en-US')} // Troca o idioma para en-US
      />
    </div>
  )
}
