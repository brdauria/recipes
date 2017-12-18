<?xml version="1.0" encoding="ISO-8859-1"?>
<!-- Edited by XMLSpy® -->
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<xsl:param name="message"></xsl:param>

<xsl:template match="catalog">
<select id="recipes"  onchange="update()">
      <xsl:for-each select="recipe">
        <xsl:element name="option">
        <xsl:attribute name="value">
                <xsl:value-of select="id"/>
        </xsl:attribute>
        <xsl:value-of select="description"/>
        </xsl:element>
      </xsl:for-each>
</select>
</xsl:template>

</xsl:stylesheet>